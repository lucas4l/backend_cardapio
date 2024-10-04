import fastify from 'fastify'
import { createProduct } from '../function/create-product'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import z from 'zod'
import { getOrder } from '../function/get-order'
import { createOrderTable } from '../function/create-order-table'
import { getAllTables } from '../function/get-all-tables'
import { getAllProductsInOrder } from '../function/get-all-products-in-order'
import { getAproductInOrder } from '../function/get-products-in-order'
import { createFullOrder } from '../function/create-full-order'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

const PORT = 3333

app.get('/orders', async () => {
  const { orders } = await getOrder()

  return {
    orders,
  }
})

app.get('/tables', async () => {
  const { tables } = await getAllTables()

  return {
    tables,
  }
})

app.get('/get-all-product-in-order', async () => {
  const { ordersInTable } = await getAllProductsInOrder()
  return {
    ordersInTable,
  }
})

app.post(
  '/get-products-in-order',
  {
    schema: {
      body: z.object({
        orderId: z.string({
          required_error: 'O ID do produto é obrigatório',
        }),
      }),
    },
  },
  async req => {
    const { orderId } = req.body
    const result = await getAproductInOrder(orderId)
    return result
  }
)

app.post(
  '/insert-product',
  {
    schema: {
      body: z.object({
        name: z.string(),
        value: z
          .number({
            required_error: 'O valor é obrigatório',
            invalid_type_error: 'O valor deve ser um número',
          })
          .min(0.01, { message: 'O valor deve ser maior que zero' })
          .max(10000, { message: 'O valor não pode exceder 10.000' })
          .refine(val => Number.isInteger(val * 100), {
            message: 'O valor deve ter no máximo 2 casas decimais',
          }),
      }),
    },
  },
  async req => {
    const { name, value } = req.body

    await createProduct({
      name,
      value,
    })
  }
)

app.post(
  '/create-order-tabler',
  {
    schema: {
      body: z.object({
        orderId: z.string({
          required_error: 'O ID do produto é obrigatório',
        }),
        idProduto: z.string({
          required_error: 'O ID do produto é obrigatório',
        }),
      }),
    },
  },
  async req => {
    const { orderId, idProduto } = req.body

    const result = await createOrderTable({
      orderId,
      idProduto,
    })

    return result
  }
)

app.post(
  '/create-full-order',
  {
    schema: {
      body: z.object({
        productId: z.string({
          required_error: 'O ID do produto é obrigatório',
        }),
        name: z.string({
          required_error: 'O nome não pode ficar vazio',
          invalid_type_error: 'Apenas letras devem ser informadas',
        }),
        numberTable: z.number({
          required_error: 'O número da mesa deve ser informado',
          invalid_type_error: 'Apenas números devem ser informados',
        }),
      }),
    },
  },
  async req => {
    const { productId, name, numberTable } = req.body

    const result = await createFullOrder({ productId, name, numberTable })

    return { result }
  }
)

app
  .listen({
    port: PORT,
  })
  .then(() => {
    console.log(`HTTP server running in http://localhost:${PORT}`)
  })
