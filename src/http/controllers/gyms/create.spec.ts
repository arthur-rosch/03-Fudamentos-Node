import { app } from '@/app'
import request from 'supertest'
import { it, afterAll, beforeAll, describe, expect } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'GymsE2E',
        discription: 'Test E2E',
        phone: '123456789',
        latitude: 37.7749,
        longitude: -122.4194,
      })

    expect(response.statusCode).toEqual(201)
  })
})
