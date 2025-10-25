import { Injectable } from "@nestjs/common"
import { PrismaService } from "@aiknew/shared-admin-db"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  get loginLogModel() {
    return this.prisma.loginLog
  }

  async getHomeStatistics() {
    const nation = await this.loginLogModel.groupBy({
      by: ["nation"],
      _count: {
        _all: true,
      },
    })

    type RawTimesCount = { day: Date; count: bigint }[]
    type NormalizeTimesCount = { day: string; count: string }[]

    const rawTimesCount: RawTimesCount = await this.prisma.$queryRaw`
      SELECT DATE("createdAt") as day, COUNT(*) as count
      FROM "LoginLog"
      GROUP BY day
      ORDER BY day DESC
    `

    const formatTimesCount = rawTimesCount.map((item) => {
      return {
        day: dayjs(item.day).utc().format("MM-DD"),
        count: item.count.toString(),
      }
    })

    let utcDate = dayjs().utc()
    const normalizeTimesCount: NormalizeTimesCount = [
      {
        count:
          formatTimesCount.find((item) => item.day === utcDate.format("MM-DD"))
            ?.count ?? "0",
        day: utcDate.format("MM-DD"),
      },
    ]
    let dayCount = 30
    while (dayCount > 0) {
      utcDate = utcDate.subtract(1, "day")
      const day = utcDate.format("MM-DD")
      normalizeTimesCount.push({
        count: formatTimesCount.find((item) => item.day === day)?.count ?? "0",
        day,
      })
      dayCount--
    }

    return {
      nations: nation.map((item) => {
        return {
          nation: item.nation,
          count: item._count._all,
        }
      }),

      times: normalizeTimesCount,
    }
  }
}
