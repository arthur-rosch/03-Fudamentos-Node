import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeCreateGymsUseCase } from '@/use-cases/factories/make-create-gym-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string(),
    discription: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((val) => {
      return Math.abs(val) <= 90
    }),
    longitude: z.number().refine((val) => {
      return Math.abs(val) <= 180
    }),
  })

  const { title, phone, discription, latitude, longitude } =
    createGymBodySchema.parse(request.body)

  const createUseCase = makeCreateGymsUseCase()

  const { gym } = await createUseCase.execute({
    title,
    phone,
    discription,
    latitude,
    longitude,
  })

  return reply.status(201).send({
    gym,
  })
}
