import { sql } from 'drizzle-orm'
import { db } from '../db'
import { orderProduct } from '../db/schema'

export async function getAllProductsInOrder() {
  const ordersInTable = await db
    .select({
      orderId: orderProduct.orderId,
      pedidos: sql`
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'productId', ${orderProduct.productId},
          'createdAt', ${orderProduct.createdAt}
        )
        ORDER BY ${orderProduct.createdAt}
      ) 
    `.as('pedidos'),
    })
    .from(orderProduct)
    .groupBy(orderProduct.orderId)
    .orderBy(orderProduct.orderId)

  return {
    ordersInTable,
  }
}
