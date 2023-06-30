import { PrimasGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CreateGymsUseCase } from '../create-gym'

export function makeCreateGymsUseCase() {
  const gymsRepository = new PrimasGymsRepository()
  const createGymsUseCase = new CreateGymsUseCase(gymsRepository)

  return createGymsUseCase
}
