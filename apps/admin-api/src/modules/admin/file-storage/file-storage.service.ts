import { PaginationDto } from '@aiknew/shared-api-dtos'
import { PrismaPromise, PrismaService } from '@aiknew/shared-api-prisma'
import { Injectable } from '@nestjs/common'
import { CreateFileStorageDto } from './dto/create-file-storage.dto'
import { UpdateFileStorageDto } from './dto/update-file-storage.dto'

@Injectable()
export class FileStorageService {
  constructor(private readonly prisma: PrismaService) {}

  async pagination(paginationDto: PaginationDto) {
    return this.prisma.fileStorage.paginate(paginationDto)
  }

  disableOthers(): PrismaPromise<unknown> {
    // currently only one file storage option can be enabled at a time
    return this.prisma.fileStorage.updateMany({
      data: {
        enable: false,
      },
    })
  }

  async createOne(data: CreateFileStorageDto) {
    const { enable } = data

    const actions: PrismaPromise<unknown>[] = []

    const create = this.prisma.fileStorage.create({
      data,
    })

    if (enable) {
      actions.push(this.disableOthers())
    }

    actions.push(create)

    return this.prisma.$transaction(actions)
  }

  async updateOne(id: string, data: UpdateFileStorageDto) {
    const { enable } = data

    const actions: PrismaPromise<unknown>[] = []
    const update = this.prisma.fileStorage.update({
      where: { id },
      data,
    })

    if (enable) {
      actions.push(this.disableOthers())
    }

    actions.push(update)

    return this.prisma.$transaction(actions)
  }

  async deleteOne(id: string) {
    return this.prisma.fileStorage.delete({
      where: {
        id,
      },
    })
  }
}
