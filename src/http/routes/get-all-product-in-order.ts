import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getAllProductsInOrder } from '../../function/get-all-products-in-order'

export const getAllProductRoute: FastifyPluginAsyncZod = async app => {
  app.get('/get-all-product-in-order', async () => {
    const { ordersInTable } = await getAllProductsInOrder()
    return {
      ordersInTable,
    }
  })
}
