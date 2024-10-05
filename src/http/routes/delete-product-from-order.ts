import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { deleteOrder } from '../../function/delete-order-from-table'
import z from 'zod'

export const deleteProductFromOrderRouter: FastifyPluginAsyncZod =
  async app => {
    app.delete(
      '/delete-product-from-order',
      {
        schema: {
          body: z.object({
            productId: z.string({
              required_error: 'O ID do produto é obrigatório',
            }),
            orderId: z.string({
              required_error: 'O ID do produto é obrigatório',
            }),
          }),
        },
      },
      async req => {
        const { orderId, productId } = req.body

        const result = await deleteOrder({ orderId, productId })

        return { result }
      }
    )
  }
