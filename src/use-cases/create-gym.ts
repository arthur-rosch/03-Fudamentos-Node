import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface RegisterGymCaseRequest {
  title: string
  discription: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface RegisterGymCaseResponse {
  gym: Gym
}

export class CreateGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    title,
    discription,
    phone,
    latitude,
    longitude,
  }: RegisterGymCaseRequest): Promise<RegisterGymCaseResponse> {
    const gym = await this.gymsRepository.create({
      title,
      discription,
      phone,
      latitude,
      longitude,
    })

    return { gym }
  }
}
