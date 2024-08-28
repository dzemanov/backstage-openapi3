//

// ******************************************************************
// * THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY. *
// ******************************************************************
import { createValidatedOpenApiRouter } from '@backstage/backend-openapi-utils';

export const spec = {
  openapi: '3.0.0',
  info: {
    title: 'Pet API',
    version: '1.0.0',
    description: 'API for managing pets.',
  },
  paths: {
    '/health': {
      get: {
        summary: 'Health check',
        responses: {
          '200': {
            description: 'Health check success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'string',
                      example: 'ok',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/pets/{id}': {
      get: {
        summary: 'Get a pet by ID',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'string',
            },
          },
          {
            name: 'type',
            in: 'query',
            required: false,
            description: 'Type of the pet to filter by',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Pet found',
            content: {
              'application/json; charset=utf-8': {
                schema: {
                  $ref: '#/components/schemas/Pet',
                },
              },
            },
          },
          '404': {
            description: 'Pet not found',
            content: {
              'application/json; charset=utf-8': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
        security: [
          {},
          {
            JWT: [],
          },
        ],
      },
      put: {
        summary: 'Update a pet by ID',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Pet updated',
            content: {
              'application/json; charset=utf-8': {
                schema: {
                  $ref: '#/components/schemas/Pet',
                },
              },
            },
          },
          '404': {
            description: 'Pet not found',
            content: {
              'application/json; charset=utf-8': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/PetUpdate',
              },
            },
          },
        },
        security: [
          {},
          {
            JWT: [],
          },
        ],
      },
    },
    '/pets': {
      get: {
        description: 'Get pets by name',
        parameters: [
          {
            name: 'name',
            in: 'query',
            required: true,
            description: 'Name of the pet to retrieve',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Pets found',
            content: {
              'application/json; charset=utf-8': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Pet',
                  },
                },
              },
            },
          },
          '400': {
            description: 'Name query parameter is required',
            content: {
              'application/json; charset=utf-8': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          '404': {
            description: 'No pets found with the given name',
            content: {
              'application/json; charset=utf-8': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
        security: [
          {},
          {
            JWT: [],
          },
        ],
      },
      post: {
        summary: 'Create a new pet',
        responses: {
          '201': {
            description: 'Pet created',
            content: {
              'application/json; charset=utf-8': {
                schema: {
                  $ref: '#/components/schemas/Pet',
                },
              },
            },
          },
          '409': {
            description: 'Pet with this ID already exists',
            content: {
              'application/json; charset=utf-8': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Pet',
              },
            },
          },
        },
        security: [
          {},
          {
            JWT: [],
          },
        ],
      },
    },
  },
  components: {
    schemas: {
      Pet: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          type: {
            type: 'string',
          },
        },
        required: ['id', 'name', 'type'],
      },
      Error: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
          },
        },
        required: ['error'],
      },
      PetUpdate: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          type: {
            type: 'string',
          },
        },
      },
    },
    securitySchemes: {
      JWT: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Backstage Permissions Framework JWT',
      },
    },
  },
} as const;
export const createOpenApiRouter = async (
  options?: Parameters<typeof createValidatedOpenApiRouter>['1'],
) => createValidatedOpenApiRouter<typeof spec>(spec, options);
