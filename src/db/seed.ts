import { client, db } from '.'
import { cliente, order, orderProduct, product, tableClient } from './schema'

async function seed() {
  await db.delete(product)
  await db.delete(tableClient)
  await db.delete(cliente)
  await db.delete(order)
  await db.delete(orderProduct)

  const productInsert = await db
    .insert(product)
    .values([
      { name: 'Costela no bafo', value: 100 },
      { name: 'Fettuchine ao molho branco', value: 50 },
      { name: 'Baião de dois', value: 20 },
    ])
    .returning()

  const orderInsert = await db.insert(order).values([{}, {}, {}]).returning()

  await db
    .insert(orderProduct)
    .values([
      { orderId: orderInsert[0].id, productId: productInsert[0].id },
      { orderId: orderInsert[1].id, productId: productInsert[1].id },
      { orderId: orderInsert[2].id, productId: productInsert[2].id },
    ])
    .returning()

  const tableInsert = await db
    .insert(tableClient)
    .values([
      { numberTable: 100, orderId: orderInsert[0].id },
      { numberTable: 110, orderId: orderInsert[1].id },
      { numberTable: 120, orderId: orderInsert[2].id },
    ])
    .returning()

  const clienteInsert = await db
    .insert(cliente)
    .values([
      { name: 'Lucas Barbosa', tableClientId: tableInsert[0].id },
      { name: 'Miguel', tableClientId: tableInsert[1].id },
      { name: 'Angelica', tableClientId: tableInsert[2].id },
    ])
    .returning()
}

seed().finally(() => {
  client.end()
})
