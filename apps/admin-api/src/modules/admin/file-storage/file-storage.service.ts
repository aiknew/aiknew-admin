import { PaginationDto } from '@aiknew/shared-api-dtos'
import { PrismaPromise, PrismaService } from '@aiknew/shared-admin-db'
import { Injectable } from '@nestjs/common'
import { CreateFileStorageDto } from './dto/create-file-storage.dto'
import { UpdateFileStorageDto } from './dto/update-file-storage.dto'
import { AppBadRequestException } from '@aiknew/shared-api-exceptions'

@Injectable()
export class FileStorageService {
  constructor(private readonly prisma: PrismaService) {}

  get model() {
    return this.prisma.fileStorage
  }

  async getActiveStorage() {
    const storage = await this.model.findFirst({
      where: { active: true },
    })

    if (!storage) {
      throw new AppBadRequestException('No file storage is being used.')
    }

    return storage
  }

  async pagination(paginationDto: PaginationDto) {
    return this.model.paginate(paginationDto)
  }

  disableOthers(): PrismaPromise<unknown> {
    // currently only one file storage option can be activated at a time
    return this.model.updateMany({
      data: {
        active: false,
      },
    })
  }

  async createOne(data: CreateFileStorageDto) {
    const { active } = data

    const actions: PrismaPromise<unknown>[] = []

    const create = this.model.create({
      data,
    })

    if (active) {
      actions.push(this.disableOthers())
    }

    actions.push(create)

    return this.prisma.$transaction(actions)
  }

  async updateOne(id: string, data: UpdateFileStorageDto) {
    const { active } = data

    const actions: PrismaPromise<unknown>[] = []
    const update = this.model.update({
      where: { id },
      data,
    })

    if (active) {
      actions.push(this.disableOthers())
    }

    actions.push(update)

    return this.prisma.$transaction(actions)
  }

  async deleteOne(id: string) {
    return this.model.delete({
      where: {
        id,
      },
    })
  }
}
