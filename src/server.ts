import express from 'express'
import { prisma } from '../lib/prisma'

const app = express()

app.use(express.json())

app.get('/', (_, res) => {
  res.status(200).json('Home')
})

app.get('/users/all', async (_, res) => {
  const users = await prisma.user.findMany({})

  res.status(200).json({ users })
})

app.listen(3000, () => {
  console.log('App is listening on port 3000...')
})
