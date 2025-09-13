import { prisma } from './prisma'

export const createFileStorage = () => {
  return prisma.fileStorage.create({
    data: {
      hostname: '/api',
      name: 'Local',
      status: 'NORMAL',
      type: 'LOCAL',
    }
  })
}