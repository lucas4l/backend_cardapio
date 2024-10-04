import { db } from '../db'
import { tableClient } from '../db/schema'

export async function getAllTables() {
  const tables = await db.select().from(tableClient)

  return { tables }
}
