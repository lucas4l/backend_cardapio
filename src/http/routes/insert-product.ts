import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { createProduct } from '../../function/create-product'

export const insertProductRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/insert-product',
    {
      schema: {
        body: z.object({
          name: z.string(),
          value: z
            .number({
              required_error: 'O valor é obrigatório',
              invalid_type_error: 'O valor deve ser um número',
            })
            .min(0.01, { message: 'O valor deve ser maior que zero' })
            .max(10000, { message: 'O valor não pode exceder 10.000' })
            .refine(val => Number.isInteger(val * 100), {
              message: 'O valor deve ter no máximo 2 casas decimais',
            }),
        }),
      },
    },
    async req => {
      const { name, value } = req.body

      await createProduct({
        name,
        value,
      })
    }
  )
}
