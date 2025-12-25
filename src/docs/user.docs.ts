export const userDocs = {
  '/api/users/all': {
    get: {
      summary: 'Get all users',
      tags: ['Users'],
      responses: {
        '200': {
          description: 'List of all users',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: { type: 'string', example: 'success' },
                  data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/User' },
                  },
                },
              },
            },
          },
        },
        '500': { $ref: '#/components/responses/InternalServerError' },
      },
    },
  },
  '/api/users/create': {
    post: {
      summary: 'Create a new user',
      tags: ['Users'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email'],
              properties: {
                email: {
                  type: 'string',
                  format: 'email',
                  example: 'newuser@example.com',
                },
                name: { type: 'string', example: 'Jane Doe' },
              },
            },
          },
        },
      },
      responses: {
        '201': {
          description: 'User created successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: { type: 'string', example: 'success' },
                  data: { $ref: '#/components/schemas/User' },
                },
              },
            },
          },
        },
        '400': { $ref: '#/components/responses/BadRequest' },
        '500': { $ref: '#/components/responses/InternalServerError' },
      },
    },
  },
  '/api/users/{id}': {
    get: {
      summary: 'Get user by ID',
      tags: ['Users'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'integer' },
          description: 'User ID',
        },
      ],
      responses: {
        '200': {
          description: 'User details',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: { type: 'string', example: 'success' },
                  data: { $ref: '#/components/schemas/User' },
                },
              },
            },
          },
        },
        '404': { $ref: '#/components/responses/NotFound' },
        '500': { $ref: '#/components/responses/InternalServerError' },
      },
    },
    put: {
      summary: 'Update user',
      tags: ['Users'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'integer' },
          description: 'User ID',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: {
                  type: 'string',
                  format: 'email',
                  example: 'updated@example.com',
                },
                name: { type: 'string', example: 'Updated Name' },
              },
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'User updated successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: { type: 'string', example: 'success' },
                  data: { $ref: '#/components/schemas/User' },
                },
              },
            },
          },
        },
        '404': { $ref: '#/components/responses/NotFound' },
        '500': { $ref: '#/components/responses/InternalServerError' },
      },
    },
    delete: {
      summary: 'Delete user',
      tags: ['Users'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'integer' },
          description: 'User ID',
        },
      ],
      responses: {
        '204': { description: 'User deleted successfully' },
        '404': { $ref: '#/components/responses/NotFound' },
        '500': { $ref: '#/components/responses/InternalServerError' },
      },
    },
  },
}
