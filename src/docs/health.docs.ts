export const healthDocs = {
  '/': {
    get: {
      summary: 'Health Check',
      tags: ['Health'],
      responses: {
        200: {
          description: 'API is running',
          content: {
            'application/json': {
              schema: {
                type: 'string',
                example: 'Home',
              },
            },
          },
        },
      },
    },
  },
}
