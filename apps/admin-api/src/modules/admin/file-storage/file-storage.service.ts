import { PrismaPromise, PrismaService } from '@aiknew/shared-admin-db'
import { Injectable } from '@nestjs/common'
import { CreateFileStorageDto } from './dto/create-file-storage.dto'
import { UpdateFileStorageDto } from './dto/update-file-storage.dto'
import { AppBadRequestException } from '@aiknew/shared-api-exceptions'
import { QueryFileStorageDto } from './dto/query-file-storage.dto'

@Injectable()
export class FileStorageService {
  constructor(private readonly prisma: PrismaService) { }

  get model(): PrismaService['fileStorage'] {
    return this.prisma.fileStorage
  }

  async getFirstStorage() {
    const storage = await this.model.findFirst({
      where: { status: 'NORMAL' },
      orderBy: [{ priority: 'asc' }, { createdAt: 'desc' }],
    })

    if (!storage) {
      throw new AppBadRequestException('No file storage can be uploaded.')
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
          mode: 'insensitive'
        },
        name: {
          contains: name,
          mode: 'insensitive'
        },
        status,
        type
      },
      orderBy: [{ priority: 'asc' }, { createdAt: 'desc' }],
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
    return this.model.delete({
      where: {
        id,
      },
    })
  }
}
