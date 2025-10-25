import { Prisma, PrismaPromise, PrismaService } from "@aiknew/shared-admin-db"
import { Injectable } from "@nestjs/common"
import { CreateFileStorageDto } from "./dto/create-file-storage.dto"
import { UpdateFileStorageDto } from "./dto/update-file-storage.dto"
import {
  AppBadRequestException,
  AppConflictException,
} from "@aiknew/shared-api-exceptions"
import { QueryFileStorageDto } from "./dto/query-file-storage.dto"
import { I18nContext, I18nService } from "nestjs-i18n"

@Injectable()
export class FileStorageService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly i18n: I18nService,
  ) {}

  get model(): PrismaService["fileStorage"] {
    return this.prisma.fileStorage
  }

  async getFirstStorage() {
    const storage = await this.model.findFirst({
      where: { status: "NORMAL" },
      orderBy: [{ priority: "asc" }, { createdAt: "desc" }],
    })

    if (!storage) {
      // throw new AppBadRequestException('No file storage can be uploaded.')
      throw new AppBadRequestException(
        this.i18n.t("file-storage.noStorage", {
          lang: I18nContext.current()?.lang,
        }),
      )
    }

    return storage
  }

  async getAll() {
    return this.model.findMany({
      omit: {
        accessKey: true,
        secretKey: true,
      },
    })
  }

  async pagination(query: QueryFileStorageDto) {
    const { hostname, name, status, type, ...pagination } = query
    return this.model.paginate(pagination, {
      where: {
        hostname: {
          contains: hostname,
          mode: "insensitive",
        },
        name: {
          contains: name,
          mode: "insensitive",
        },
        status,
        type,
      },
      orderBy: [{ priority: "asc" }, { createdAt: "desc" }],
    })
  }

  async createOne(data: CreateFileStorageDto) {
    const actions: PrismaPromise<unknown>[] = []

    const create = this.model.create({
      data,
    })

    actions.push(create)

    return this.prisma.$transaction(actions)
  }

  async updateOne(id: string, data: UpdateFileStorageDto) {
    return this.model.update({
      where: { id },
      data,
    })
  }

  async deleteOne(id: string) {
    try {
      return await this.model.delete({
        where: {
          id,
        },
      })
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
          case "P2003":
            throw new AppConflictException(
              this.i18n.t("file-storage.hasRelated", {
                lang: I18nContext.current()?.lang,
              }),
            )
        }
      }
    }
  }
}
