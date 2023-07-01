import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsBodySchema = z.object({
    userLatitude: z.number().refine((val) => {
      return Math.abs(val) <= 90
    }),
    userLongitude: z.number().refine((val) => {
      return Math.abs(val) <= 180
    }),
  })

  const { userLatitude, userLongitude } = nearbyGymsBodySchema.parse(
    request.body,
  )

  const nearByUseCase = makeFetchNearbyGymsUseCase()

  const { gyms } = await nearByUseCase.execute({
    userLatitude,
    userLongitude,
  })

  return reply.status(200).send({
    gyms,
  })
}
