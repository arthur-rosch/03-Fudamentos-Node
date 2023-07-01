import request from 'supertest'
import { FastifyInstance } from 'fastify'

export async function CreateAndAuthenticate(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'John Doe',
    email: 'johndoe@example2.com',
    password: '123456',
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@example2.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}
