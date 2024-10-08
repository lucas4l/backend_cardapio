import { eq, sql } from 'drizzle-orm'
import { db } from '../db'
import { order, orderProduct, product, tableClient } from '../db/schema'

export async function getAproductInOrder(orderId: string) {
  const result = await db
    .select({
      table: tableClient.numberTable,
      orderId: orderProduct.orderId,
      pedidos: sql`
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'productId', ${orderProduct.productId},
          'productName', ${product.name},
          'productValue', ${product.value},
          'createdAt', ${orderProduct.createdAt}
        )
        ORDER BY ${orderProduct.createdAt}
      ) 
    `.as('pedidos'),
    })
    .from(orderProduct)
    .groupBy(tableClient.numberTable, orderProduct.orderId)
    .leftJoin(product, eq(orderProduct.productId, product.id))
    .leftJoin(order, eq(orderProduct.orderId, order.id))
    .leftJoin(tableClient, eq(tableClient.orderId, order.id))
    .where(eq(orderProduct.orderId, orderId))

  return { result }
}
