import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createOrderTable } from '../../function/create-order-table'
import z from 'zod'

export const createOrderTableRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/create-order-table',
    {
      schema: {
        body: z.object({
          orderId: z.string({
            required_error: 'O ID do produto é obrigatório',
          }),
          idProduto: z.string({
            required_error: 'O ID do produto é obrigatório',
          }),
        }),
      },
    },
    async req => {
      const { orderId, idProduto } = req.body

      const result = await createOrderTable({
        orderId,
        idProduto,
      })

      return result
    }
  )
}
