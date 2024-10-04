import { eq } from 'drizzle-orm'
import { db } from '../db'
import { cliente, tableClient } from '../db/schema'

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

  const orders = await db
    .with(getAllTables, getAllClients)
    .select({
      id: getAllClients.id,
      name: getAllClients.name,
      createdAt: getAllClients.createdAt,
      tableClientId: getAllTables.id,
      tableClientNumber: getAllTables.numberTable,
      orderId: getAllTables.orderId,
    })
    .from(getAllClients)
    .leftJoin(getAllTables, eq(getAllClients.tableClient, getAllTables.id))

  return { orders }
}
