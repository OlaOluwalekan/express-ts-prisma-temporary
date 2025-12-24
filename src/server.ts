import express from 'express'
import { prisma } from './lib/prisma'
import morgan from 'morgan'
import { logger } from './utils/logger'

const app = express()

app.use(express.json())

app.use(
  morgan((tokens, req, res) => {
    const status = Number(tokens.status(req, res))
    const message = [
      tokens.method(req, res),
      tokens.url(req, res),
      status,
      tokens['response-time'](req, res),
      'ms',
    ].join(' ')

    if (status >= 500) {
      logger.error(message)
    } else if (status >= 400) {
      logger.warn(message)
    } else {
      logger.info(message)
    }

    return null
  })
)

app.get('/', (_, res) => {
  res.status(200).json('Home')
})

app.get('/users/all', async (_, res) => {
  const users = await prisma.user.findMany({})

  console.log('This users ==>', users)

  res.status(200).json({ users })
})

app.listen(3000, () => {
  console.log('App is listening on port 3000...')
})
