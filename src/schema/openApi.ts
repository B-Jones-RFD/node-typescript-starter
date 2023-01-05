import { getEcho } from '~/routes'

/**
 * @see https://swagger.io/specification/#openapi-object
 */
export const openApiSpec = {
  openapi: '3.0.3',
  info: {
    title: 'Title',
    description: 'Description',
    contact: {
      name: 'Contact',
      email: 'contact.email@anyisp.com',
    },
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:4001/api/v1',
      description: 'Local',
    },
  ],
  tags: [
    {
      name: 'Base',
      description: 'Base functions',
    },
  ],
  paths: {
    '/': { get: getEcho },
  },
}
