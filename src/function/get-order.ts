import { eq, sql } from 'drizzle-orm'
import { db } from '../db'
import { cliente, orderProduct, tableClient } from '../db/schema'

export async function getOrder() {
  const getAllTables = db.$with('get_all_tables').as(
    db
      .select({
        id: tableClient.id,
        numberTable: tableClient.numberTable,
        orderId: tableClient.orderId,
        createdAt: tableClient.createdAt,
      })
      .from(tableClient)
  )

  const getAllClients = db.$with('get_all_clients').as(
    db
      .select({
        id: cliente.id,
        name: cliente.name,
        tableClient: cliente.tableClientId,
        createdAt: cliente.createdAt,
      })
      .from(cliente)
  )

  const ordersInTable = db.$with('test').as(
    db
      .select({
        pedidos: sql`
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'productId', ${orderProduct.productId},
          'createdAt', ${orderProduct.createdAt}
        )
        ORDER BY ${orderProduct.createdAt}
      ) 
    `.as('pedidos'),
        orderId: orderProduct.orderId,
      })
      .from(orderProduct)
      .groupBy(orderProduct.orderId)
  )

  const orders = await db
    .with(getAllTables, getAllClients, ordersInTable)
    .select({
      id: getAllClients.id,
      name: getAllClients.name,
      createdAt: getAllClients.createdAt,
      tableClientId: getAllTables.id,
      tableClientNumber: getAllTables.numberTable,
      orderId: getAllTables.orderId,
      pedido: ordersInTable.pedidos,
    })
    .from(getAllClients)
    .leftJoin(getAllTables, eq(getAllClients.tableClient, getAllTables.id))
    .leftJoin(ordersInTable, eq(getAllTables.orderId, ordersInTable.orderId))
  return { orders }
}
