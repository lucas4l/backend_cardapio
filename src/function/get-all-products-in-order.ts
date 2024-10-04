import { db } from '../db'
import { orderProduct } from '../db/schema'

export async function getAllProductsInOrder() {
  const ordersInTable = await db.select().from(orderProduct)

  return {
    ordersInTable,
  }
}
