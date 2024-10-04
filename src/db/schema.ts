import { createId } from '@paralleldrive/cuid2'
import { pgTable, text, timestamp, integer } from 'drizzle-orm/pg-core'

export const cliente = pgTable('cliente', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name').notNull(),
  tableClientId: text('mesa_cliente')
    .references(() => tableClient.id)
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const tableClient = pgTable('mesa', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  numberTable: integer('numero_mesa').notNull(),
  orderId: text('pedido')
    .references(() => order.id)
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const product = pgTable('produto', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name').notNull(),
  value: integer('value').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const order = pgTable('pedido', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const orderProduct = pgTable('order_product', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  orderId: text('order_id')
    .references(() => order.id)
    .notNull(),
  productId: text('product_id')
    .references(() => product.id)
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})
