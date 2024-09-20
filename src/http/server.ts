import fastify from 'fastify'

const app = fastify()

const PORT = 3333

app
  .listen({
    port: PORT,
  })
  .then(() => {
    console.log(`HTTP server running in http://localhost:${PORT}`)
  })
