import { checkIn } from './create'
import { history } from './history'
import { metrics } from './metrics'
import { validate } from './validate'
import { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/http/middlewares/verify-jwt'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)

  app.post('/gyms/:gymId/check-ins', checkIn)
  app.patch('/check-ins/:checkInId/validate', validate)
}
