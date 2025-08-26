import { PaginationDto } from '@aiknew/shared-api-dtos'
import { PrismaPromise, PrismaService } from '@aiknew/shared-admin-db'
import { Injectable } from '@nestjs/common'
import { CreateFileStorageDto } from './dto/create-file-storage.dto'
import { UpdateFileStorageDto } from './dto/update-file-storage.dto'
import { AppBadRequestException } from '@aiknew/shared-api-exceptions'

@Injectable()
export class FileStorageService {
  constructor(private readonly prisma: PrismaService) {}

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

  async pagination(paginationDto: PaginationDto) {
    return this.model.paginate(paginationDto, {
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
