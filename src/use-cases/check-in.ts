import { CheckIn } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CheckInUseCaseRequest {
  user_id: string
  gym_id: string
  userLatitude: number
  userLongitude: number
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsInsRepository: GymsRepository,
  ) {}

  async execute({
    user_id,
    gym_id,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsInsRepository.findById(gym_id)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

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
