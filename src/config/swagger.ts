import swaggerJsdoc, { Options } from 'swagger-jsdoc'
import { userDocs } from '../docs/user.docs'
import { healthDocs } from '../docs/health.docs'

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express TypeScript API with Prisma',
      version: '1.0.0',
      description:
        'A professional Express API with TypeScript, Prisma ORM, and Swagger documentation',
      contact: {
        name: 'API Support',
        email: 'support@example.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
      {
        url: 'https://express-ts-prisma-temporary.onrender.com',
        description: 'Production server',
      },
    ],
    paths: { ...userDocs, ...healthDocs },
    components: {
      schemas: {
        User: {
          type: 'object',
          required: ['email'],
          properties: {
            id: {
              type: 'integer',
              description: 'The auto-generated id of the user',
              example: 1,
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
              example: 'johndoe@example.com',
            },
            name: {
              type: 'string',
              nullable: true,
              description: 'User name',
              example: 'John Doe',
            },
            posts: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Post',
              },
            },
          },
        },
        Post: {
          type: 'object',
          required: ['title', 'authorId'],
          properties: {
            id: {
              type: 'integer',
              description: 'The auto-generated id of the post',
              example: 1,
            },
            title: {
              type: 'string',
              description: 'Post title',
              example: 'My First Post',
            },
            content: {
              type: 'string',
              nullable: true,
              description: 'Post content',
              example: 'This is the content of my first post.',
            },
            published: {
              type: 'boolean',
              description: 'Publication status',
              example: false,
              default: false,
            },
            authorId: {
              type: 'integer',
              description: 'The id of the post author',
              example: 1,
            },
            author: {
              $ref: '#/components/schemas/User',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'error',
            },
            message: {
              type: 'string',
              example: 'An error occurred',
            },
          },
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'success',
            },
            data: {
              type: 'object',
            },
          },
        },
      },
      responses: {
        NotFound: {
          description: 'Resource not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
        BadRequest: {
          description: 'Bad request',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
        InternalServerError: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
      },
    },
  },
  apis: [], // Path to the API routes
}

export const swaggerSpec = swaggerJsdoc(options)
