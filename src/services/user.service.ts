import { User } from '../../generated/prisma/client'
import { prisma } from '../lib/prisma'

export const getAllUsers = async (): Promise<User[]> => {
  const users = await prisma.user.findMany({
    include: {
      posts: true,
    },
  })

  return users
}
