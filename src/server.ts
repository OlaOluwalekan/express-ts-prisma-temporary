import express from 'express'
import morgan from 'morgan'
import { logger } from './utils/logger'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger'
import userRoutes from './routes/user.routes'

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

// Swagger Documentation
app.use(
  '/api/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Express TS | API Documentation',
  })
)

// Serve swagger spec as JSON
app.get('/api/docs.json', (_, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
})

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API is running
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Home"
 */
app.get('/', (_, res) => {
  res.status(200).json('Home')
})

app.use('/api/users', userRoutes)

app.listen(3000, () => {
  // console.log('App is listening on port 3000...')
  logger.info('App is listening on port 3000...')
})
