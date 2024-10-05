import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createFullOrder } from '../../function/create-full-order'
import z from 'zod'

export const createFullOrderRouter: FastifyPluginAsyncZod = async app => {
  app.post(
    '/create-full-order',
    {
      schema: {
        body: z.object({
          productId: z.string({
            required_error: 'O ID do produto é obrigatório',
          }),
          name: z.string({
            required_error: 'O nome não pode ficar vazio',
            invalid_type_error: 'Apenas letras devem ser informadas',
          }),
          numberTable: z.number({
            required_error: 'O número da mesa deve ser informado',
            invalid_type_error: 'Apenas números devem ser informados',
          }),
        }),
      },
    },
    async req => {
      const { productId, name, numberTable } = req.body

      const result = await createFullOrder({ productId, name, numberTable })

      return { result }
    }
  )
}
