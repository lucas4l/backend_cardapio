import { client, db } from '.'
import { cliente, order } from './schema'

async function seed() {
  await db.delete(cliente)
  await db.delete(order)

  const result = await db
    .insert(order)
    .values([
      { name: 'Costela no bafo', value: '100,00' },
      { name: 'Fettuchine ao molho branco', value: '50,00' },
      { name: 'Baião de dois', value: '20,00' },
    ])
    .returning()

  await db.insert(cliente).values([
    { demand: result[0].id, name: 'Lucas Barbosa', table: '10' },
    { demand: result[1].id, name: 'Miguel', table: '20' },
    { demand: result[2].id, name: 'ANgelica', table: '30' },
  ])
}

seed().finally(() => {
  client.end()
})
