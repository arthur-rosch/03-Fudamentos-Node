import { prisma } from '@/lib/prisma'
import { CheckIn, Prisma } from '@prisma/client'

import dayjs from 'dayjs'
import { CheckInsRepository } from '../check-ins-repository'

export class PrimasCheckInsRepository implements CheckInsRepository {
  async findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const CheckIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    })

    return CheckIn
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return checkIns
  }

  async findById(id: string) {
    const checkIn = await prisma.checkIn.findFirst({
      where: {
        id,
      },
    })

    return checkIn
  }

  async countByUserId(userId: string) {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    })

    return count
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = prisma.checkIn.create({
      data,
    })

    return checkIn
  }

  async save(data: CheckIn) {
    const CheckIn = prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    })

    return CheckIn
  }
}
