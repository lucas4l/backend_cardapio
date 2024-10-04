import { db } from '../db'
import { product } from '../db/schema'

interface CreateProductRequest {
  name: string
  value: number
}

export async function createProduct({ name, value }: CreateProductRequest) {
  const result = await db
    .insert(product)
    .values({
      name,
      value,
    })
    .returning()

  const newProduct = result[0]

  return {
    newProduct,
  }
}
