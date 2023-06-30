import { ValidateCheckInUseCase } from '../validate-check-in'
import { PrimasCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeValidateCheckInUseCase() {
  const checkInsRepository = new PrimasCheckInsRepository()
  const validateCheckInUseCase = new ValidateCheckInUseCase(checkInsRepository)

  return validateCheckInUseCase
}
