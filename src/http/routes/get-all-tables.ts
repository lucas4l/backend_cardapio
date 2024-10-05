import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getAllTables } from '../../function/get-all-tables'

export const getAllTablesRoute: FastifyPluginAsyncZod = async app => {
  app.get('/tables', async () => {
    const { tables } = await getAllTables()

    return {
      tables,
    }
  })
}
