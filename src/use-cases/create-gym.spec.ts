import { CreateGymsUseCase } from './create-gym'
import { Decimal } from '@prisma/client/runtime/library'
import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymsUseCase

describe('Create Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymsUseCase(gymsRepository)
  })

  it('should to create', async () => {
    const { gym } = await sut.execute({
      title: 'Js Gym',
      discription: 'Javascript',
      phone: '+55 47 99999999',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
