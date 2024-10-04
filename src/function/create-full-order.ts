import { createId } from '@paralleldrive/cuid2'
import { db } from '../db'
import { cliente, order, orderProduct, tableClient } from '../db/schema'

interface insertInfoOrder {
  productId: string
  numberTable: number
  name: string
}

export async function createFullOrder({
  name,
  numberTable,
  productId,
}: insertInfoOrder) {
  const newOrder = await db
    .insert(order)
    .values({
      id: createId(),
    })
    .returning({ id: order.id })

  const orderId = newOrder[0]?.id

  if (!orderId) {
    throw new Error('Falha ao criar o pedido')
  }

  const newOrderProduct = await db
    .insert(orderProduct)
    .values({ productId, orderId })

  const newTableWhitOrder = await db
    .insert(tableClient)
    .values({ numberTable, orderId })
    .returning({ id: tableClient.id })

  const tableClientId = newTableWhitOrder[0]?.id

  const newClientWhitTable = await db
    .insert(cliente)
    .values({ name, tableClientId })

  return { newClientWhitTable }
}
