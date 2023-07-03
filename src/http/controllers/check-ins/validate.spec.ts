import { app } from '@/app'
import request from 'supertest'
import { it, afterAll, beforeAll, describe, expect } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Validate Check-ins (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to validate  check-in', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

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

    const checkIn = await request(app.server)
      .post(`/gyms/${gymId}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: 37.7749,
        longitude: -122.4194,
      })

    const checkInId = checkIn.body.checkIn.id

    const response = await request(app.server)
      .patch(`/check-ins/${checkInId}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
  })
})
