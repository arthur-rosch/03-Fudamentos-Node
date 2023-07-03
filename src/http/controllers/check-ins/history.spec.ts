import { app } from '@/app'
import request from 'supertest'
import { it, afterAll, beforeAll, describe, expect } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('History Check-ins (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user check-in history', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const gym = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'GymsE2E',
        discription: 'Test E2E',
        phone: '123456789',
        latitude: 37.7749,
        longitude: -122.4194,
      })

    const gymId = gym.body.gym.id

    await request(app.server)
      .post(`/gyms/${gymId}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: 37.7749,
        longitude: -122.4194,
      })

    const response = await request(app.server)
      .post(`/check-ins/history`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        page: 1,
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkIns).toEqual([
      expect.objectContaining({
        gym_id: gymId,
      }),
    ])
  })
})
