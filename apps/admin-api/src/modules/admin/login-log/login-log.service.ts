import { Injectable } from "@nestjs/common"
import { PrismaService } from "@aiknew/shared-admin-db"
import { QueryLoginLogDto } from "./dto/query-login-log.dto"
import { LoginLogDto } from "./dto/login-log.dto"
import { HttpService } from "@nestjs/axios"
import { isPrivateIP } from "range_check"
import { ConfigService } from "@nestjs/config"
import { UAParser } from "ua-parser-js"

interface IpLocationResponse {
  city_name?: string
  region_name?: string
  country_name?: string
}

@Injectable()
export class LoginLogService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  get model() {
    return this.prisma.loginLog
  }

  async pagination(query: QueryLoginLogDto) {
    const { currentPage, pageSize, userName, ip, location, os, browser } = query

    return this.model.paginate(
      { currentPage, pageSize },
      {
        where: {
          userName: {
            contains: userName,
            mode: "insensitive",
          },
          ip: {
            contains: ip,
          },
          location: {
            contains: location,
            mode: "insensitive",
          },
          os: {
            contains: os,
            mode: "insensitive",
          },
          browser: {
            contains: browser,
            mode: "insensitive",
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    )
  }

  async record(
    data: Omit<
      LoginLogDto,
      "os" | "browser" | "location" | "nation" | "id" | "createdAt"
    >,
  ) {
    const { browser, os } = this.parseUserAgent(data.userAgent)
    const { location, nation } = await this.getIpLocation(data.ip)

    return this.model.create({
      data: {
        ...data,
        browser,
        os,
        location,
        nation,
      },
    })
  }

  async getIpLocation(
    ip: string,
  ): Promise<{ location: string; nation: string }> {
    if (isPrivateIP(ip)) {
      return {
        location: "",
        nation: "",
      }
    }

    let url = "https://api.ip2location.io/?ip="

    const key = this.configService.get<string>("IP2LOCATION_KEY")

    if (typeof key === "string" && key.trim().length > 0) {
      url = `https://api.ip2location.io/?key=${key}&ip=`
    }

    let location = ""
    let nation = ""

    try {
      const res = await this.httpService.axiosRef.get(url + ip)
      const data = res.data as IpLocationResponse
      location =
        (data.city_name || "") +
        " " +
        (data.region_name || "") +
        " " +
        (data.country_name || "")
      nation = data.country_name || ""
    } catch (err) {
      console.log("get ip location error: ", err)
    }

    return {
      location,
      nation,
    }
  }

  parseUserAgent(userAgentString: string): { os: string; browser: string } {
    const { browser, os } = UAParser(userAgentString)

    const toString = (strOrUndefined: string | undefined) => {
      return strOrUndefined ?? ""
    }

    return {
      browser: `${toString(browser.name)} ${toString(browser.version)}`,
      os: `${toString(os.name)} ${toString(os.version)}`,
    }
  }
}
