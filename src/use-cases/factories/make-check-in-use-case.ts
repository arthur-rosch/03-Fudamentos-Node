import { CheckInUseCase } from '../check-in'
import { PrimasGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { PrimasCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeCheckInUseCase() {
  const gymsRepository = new PrimasGymsRepository()
  const checkInsRepository = new PrimasCheckInsRepository()

  const checkInUseCase = new CheckInUseCase(checkInsRepository, gymsRepository)

  return checkInUseCase
}
