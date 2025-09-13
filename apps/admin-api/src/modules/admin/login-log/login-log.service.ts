import { Injectable } from '@nestjs/common'
import { PrismaService } from '@aiknew/shared-admin-db'
import { CreateLoginLogDto } from './dto/create-login-log.dto'
import { QueryLoginLogDto } from './dto/query-login-log.dto'
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios'
import type { AxiosError } from 'axios'
import { isPrivateIP } from 'range_check';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoginLogService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) { }

  get model() {
    return this.prisma.loginLog
  }

  async pagination(query: QueryLoginLogDto) {
    const { currentPage, pageSize, userName, ip, location, os, browser } = query

    return this.model.paginate({ currentPage, pageSize }, {
      where: {
        userName: {
          contains: userName,
          mode: 'insensitive'
        },
        ip: {
          contains: ip
        },
        location: {
          contains: location,
          mode: 'insensitive'
        },
        os: {
          contains: os,
          mode: 'insensitive'
        },
        browser: {
          contains: browser,
          mode: 'insensitive'
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  async record(data: Omit<CreateLoginLogDto, 'os' | 'browser' | 'location'>) {
    const { browser, os } = this.parseUserAgent(data.userAgent)

    return this.model.create({
      data: {
        ...data,
        browser,
        os,
        location: await this.getIpLocation(data.ip)
      },
    })
  }

  async getIpLocation(ip: string): Promise<string> {

    if (isPrivateIP(ip)) {
      return ''
    }

    let url = 'https://api.ip2location.io/?ip='

    const key = this.configService.get<string>('IP2LOCATION_KEY')

    if (typeof key === 'string' && key.trim().length > 0) {
      url = `https://api.ip2location.io/?key=${key}&ip=`
    }

    let location = ''

    try {
      const res = await this.httpService.axiosRef.get(url + ip)
      location = res.data.city_name + ' ' + res.data.region_name + ' ' + res.data.country_name
    } catch (err) {
      console.log('get ip location error: ', err)
    }

    return location
  }

  parseUserAgent(userAgentString: string): { os: string, browser: string } {
    let os = 'unknown'
    let browser = 'unknown'

    if (userAgentString.includes('Windows')) {
      os = 'Windows'
    } else if (userAgentString.includes('Mac OS X')) {
      os = 'macOS'
    } else if (userAgentString.includes('Linux')) {
      os = 'Linux'
    } else if (userAgentString.includes('Android')) {
      os = 'Android'
    } else if (userAgentString.includes('iOS')) {
      os = 'iOS'
    }

    if (userAgentString.includes('Chrome') && !userAgentString.includes('Edg')) {
      browser = 'Chrome'
    } else if (userAgentString.includes('Firefox')) {
      browser = 'Firefox'
    } else if (userAgentString.includes('Safari') && !userAgentString.includes('Chrome')) {
      browser = 'Safari'
    } else if (userAgentString.includes('Edg')) {
      browser = 'Edge'
    } else if (userAgentString.includes('Opera')) {
      browser = 'Opera'
    }

    return { os, browser }
  }
}