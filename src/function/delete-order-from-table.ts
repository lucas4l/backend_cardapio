import { and, eq, ne } from 'drizzle-orm'
import { db } from '../db'
import { orderProduct } from '../db/schema'

interface orderProps {
  productId: string
  orderId: string
}

export async function deleteOrder({ orderId, productId }: orderProps) {
  const item = await db
    .select({
      id: orderProduct.id,
    })
    .from(orderProduct)
    .where(
      and(
        eq(orderProduct.orderId, orderId),
        eq(orderProduct.productId, productId)
      )
    )
    .limit(1)

  const orderProductId = item[0]?.id

  const deleteItemOrder = await db
    .delete(orderProduct)
    .where(eq(orderProduct.id, orderProductId))

  return { deleteItemOrder }
}
