import { CheckInUseCase } from '@/use-cases/check-in'
import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

let checkInRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check-in', async () => {
    const { checkIn } = await sut.execute({
      gym_id: 'gym-1',
      user_id: 'user-1',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
  it('should not be able to check-in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gym_id: 'gym-1',
      user_id: 'user-1',
    })

    await expect(() =>
      sut.execute({
        gym_id: 'gym-1',
        user_id: 'user-1',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to check-in twice but different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gym_id: 'gym-1',
      user_id: 'user-1',
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gym_id: 'gym-1',
      user_id: 'user-1',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
