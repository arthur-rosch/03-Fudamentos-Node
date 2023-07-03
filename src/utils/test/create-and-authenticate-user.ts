import request from 'supertest'
import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import { hash } from 'bcryptjs'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@example2.com',
      role: isAdmin ? 'ADMIN' : 'MEMBER',
      password_hash: await hash('123456', 6),
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: user.email,
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}
