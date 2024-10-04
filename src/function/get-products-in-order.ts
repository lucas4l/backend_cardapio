import { eq } from 'drizzle-orm'
import { db } from '../db'
import { order, orderProduct, product, tableClient } from '../db/schema'

export async function getAproductInOrder(orderId: string) {
  const result = await db
    .select({
      table: tableClient.numberTable,
      orderId: orderProduct.orderId,
      productId: orderProduct.productId,
      productValue: product.value,
      productName: product.name,
    })
    .from(orderProduct)
    .leftJoin(product, eq(orderProduct.productId, product.id))
    .leftJoin(order, eq(orderProduct.orderId, order.id))
    .leftJoin(tableClient, eq(tableClient.orderId, order.id))
    .where(eq(orderProduct.orderId, orderId))

  return { result }
}
