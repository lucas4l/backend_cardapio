import fastify from 'fastify'
import { createOrder } from '../function/create-order'
import z from 'zod'

const app = fastify()

const PORT = 3333

app.post('/order', async req => {
  const createOrderSchema = z.object({
    name: z.string(),
    value: z.string(),
  })

  const body = createOrderSchema.parse(req.body)

  await createOrder({
    name: body.name,
    value: body.value,
  })
})

app
  .listen({
    port: PORT,
  })
  .then(() => {
    console.log(`HTTP server running in http://localhost:${PORT}`)
  })
