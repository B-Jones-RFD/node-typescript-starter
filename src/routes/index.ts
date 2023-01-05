import express from 'express'
import { getEcho as echoController } from '~/controllers'

const router = express.Router()

router.get('/', function (req, res) {
  res.redirect('/api/v1')
})

export const getEcho = {
  summary: 'Echo',
  tags: ['Base'],
  description: 'Confirm communication with api',
  operationId: 'getEcho',
  responses: {
    '200': {
      description: 'Success',
      content: {
        'application/text': {
          schema: {
            type: 'string',
            value: 'Successful communication with service',
          },
        },
      },
    },
    '500': { description: 'Internal Error' },
  },
}
router.get('/api/v1', echoController)

export default router
