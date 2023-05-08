import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'

interface CheckInUseCaseRequest {
  user_id: string
  gym_id: string
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    user_id,
    gym_id,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.create({
      user_id,
      gym_id,
    })

    if (!checkIn) {
      throw new InvalidCredentialsError()
    }

    return {
      checkIn,
    }
  }
}
