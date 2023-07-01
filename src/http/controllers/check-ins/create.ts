import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'

export async function checkIn(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const checkInBodySchema = z.object({
    latitude: z.number().refine((val) => {
      return Math.abs(val) <= 90
    }),
    longitude: z.number().refine((val) => {
      return Math.abs(val) <= 180
    }),
  })

  const { gymId } = createCheckInParamsSchema.parse(request.params)

  const { latitude, longitude } = checkInBodySchema.parse(request.body)

  const checkInUseCase = makeCheckInUseCase()

  const { checkIn } = await checkInUseCase.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send({
    checkIn,
  })
}
