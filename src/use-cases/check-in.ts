import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'

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
    const CheckInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      user_id,
      new Date(),
    )

    if (CheckInOnSameDay) {
      throw new Error()
    }

    const checkIn = await this.checkInsRepository.create({
      user_id,
      gym_id,
    })

    return {
      checkIn,
    }
  }
}
