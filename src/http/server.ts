import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { getAllOrdersRoute } from './routes/get-all-orders'
import { getAllTablesRoute } from './routes/get-all-tables'
import { getAllProductRoute } from './routes/get-all-product-in-order'
import { getProducstRoute } from './routes/get-products-in-order'
import { insertProductRoute } from './routes/insert-product'
import { createOrderTableRoute } from './routes/create-order-table'
import { createFullOrderRouter } from './routes/create-full-order'
import { deleteProductFromOrderRouter } from './routes/delete-product-from-order'
import fastifyCors from '@fastify/cors'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(getAllOrdersRoute)
app.register(getAllTablesRoute)
app.register(getAllProductRoute)
app.register(getProducstRoute)
app.register(insertProductRoute)
app.register(createOrderTableRoute)
app.register(createFullOrderRouter)
app.register(deleteProductFromOrderRouter)

const PORT = 3333

app
  .listen({
    port: PORT,
  })
  .then(() => {
    console.log(`HTTP server running in http://localhost:${PORT}`)
  })
