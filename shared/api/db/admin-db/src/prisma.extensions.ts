/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Prisma } from "./prisma-client"
import dayjs from "dayjs"

export const existsExtension = Prisma.defineExtension({
  name: "exists-extension",
  model: {
    $allModels: {
      async exists<T>(
        this: T,
        where: Prisma.Args<T, "findFirst">["where"],
      ): Promise<boolean> {
        const context = Prisma.getExtensionContext(this)
        const result = await (context as any).findFirst({ where })
        return result !== null
      },
    },
  },
})

export const softDeleteExtension = Prisma.defineExtension({
  name: "soft-delete-extension",
  model: {
    $allModels: {
      softDelete<M, A>(
        this: M,
        where: Prisma.Args<M, "update">["where"],
      ): Promise<Prisma.Result<M, A, "update">> {
        const context = Prisma.getExtensionContext(this)
        return (context as any).update({
          where,
          data: {
            deletedAt: new Date(),
          },
        })
      },
    },
  },
})

export const paginateExtension = Prisma.defineExtension({
  name: "paginate-extension",
  model: {
    $allModels: {
      // Get pagination list
      async paginate<T, A>(
        this: T,
        {
          currentPage: current,
          pageSize,
        }: {
          currentPage: number
          pageSize: number
        },
        args?: Prisma.Exact<A, Prisma.Args<T, "findMany">>,
      ) {
        const findManyArgs = (args ? args : {}) as Record<string, any>
        // Get the current model at runtime
        const context = Prisma.getExtensionContext<T>(this)
        // Get pagination list with current page and page size condition
        const list = (await (context as any).findMany({
          take: pageSize,
          skip: pageSize * (current - 1),
          ...findManyArgs,
        })) as Prisma.Result<T, A, "findMany">
        // Get the total number of current model records
        const total = (await (context as any).count({
          where: findManyArgs?.where,
        })) as number

        return {
          current,
          pageSize,
          total,
          list,
        }
      },
    },
  },
})

function formatDates(val: Record<string, any>) {
  const fields = ["createdAt", "updatedAt", "deletedAt"]
  const formatted = { ...val }
  fields.forEach((field) => {
    if (formatted[field] instanceof Date) {
      formatted[field] = dayjs(formatted[field]).format("YYYY-MM-DD HH:mm:ss")
    }
  })

  return formatted
}
export const formatDateExtension = Prisma.defineExtension({
  name: "format-date-extension",
  query: {
    $allModels: {
      $allOperations({ args, query }) {
        return query(args).then((result) => {
          if (Array.isArray(result)) {
            return result.map(formatDates)
          } else if (typeof result === "object" && result !== null) {
            return formatDates(result)
          }
          return result
        })
      },
    },
  },
})
