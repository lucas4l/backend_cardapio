import { db } from '../db'
import { order } from '../db/schema'

interface CreateOrderRequest {
  name: string
  value: string
}

export async function createOrder({ name, value }: CreateOrderRequest) {
  const result = await db
    .insert(order)
    .values({
      name,
      value,
    })
    .returning()

  const orders = result[0]

  return {
    orders,
  }
}
