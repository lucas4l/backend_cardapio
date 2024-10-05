import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getAproductInOrder } from '../../function/get-products-in-order'
import z from 'zod'

export const getProducstRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/get-products-in-order',
    {
      schema: {
        body: z.object({
          orderId: z.string({
            required_error: 'O ID do produto é obrigatório',
          }),
        }),
      },
    },
    async req => {
      const { orderId } = req.body
      const result = await getAproductInOrder(orderId)
      return result
    }
  )
}
