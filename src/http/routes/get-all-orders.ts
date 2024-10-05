import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getOrder } from '../../function/get-order'

export const getAllOrdersRoute: FastifyPluginAsyncZod = async app => {
  app.get('/orders', async () => {
    const { orders } = await getOrder()

    return {
      orders,
    }
  })
}
