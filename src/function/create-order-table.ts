import { db } from '../db'
import { orderProduct } from '../db/schema'

interface AddProductToOrderRequest {
  orderId: string
  idProduto: string
}

export async function createOrderTable({
  orderId,
  idProduto,
}: AddProductToOrderRequest) {
  const insertProductInTable = await db
    .insert(orderProduct)
    .values({
      orderId,
      productId: idProduto,
    })

    .returning()

  const newProductInTable = insertProductInTable[0]

  return { newProductInTable }
}
