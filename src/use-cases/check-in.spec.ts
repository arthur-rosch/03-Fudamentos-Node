import { CheckInUseCase } from '@/use-cases/check-in'
import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

let checkInRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInRepository)
  })

  it('should be able to check-in', async () => {
    const { checkIn } = await sut.execute({
      gym_id: 'gym-1',
      user_id: 'user-1',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
