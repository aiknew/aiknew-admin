import { prisma } from '../../prisma'

export const createFileStorage = async () => {
  const storage = await prisma.fileStorage.findFirst({
    where: {
      name: 'Local'
    }
  })

  if (!storage) {
    return prisma.fileStorage.create({
      data: {
        hostname: '/api',
        name: 'Local',
        status: 'NORMAL',
        type: 'LOCAL',
      }
    })
  }

}