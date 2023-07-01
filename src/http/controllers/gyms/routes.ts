import { search } from './search'
import { nearby } from './nearby'
import { create } from './create'
import { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/http/middlewares/verify-jwt'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/gyms', create)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)
}
