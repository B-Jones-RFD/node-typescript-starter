import type { SystemError } from './@types/index'
import logger from './logger'
import createApp from './setup/createExpressApp'
import { createServer } from 'http'

const port = process.env.PORT || 4001
const app = createApp(logger)
const server = createServer()

server
  .on('request', app)
  .on('listening', function () {
    const addr = server.address() || { port }
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`
    logger.info(`Listening on ${bind}`)
  })
  .on('error', function (error: SystemError) {
    if (error.syscall !== 'listen') throw error
    const addr = server.address() || { port }
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`
    switch (error.code) {
      case 'EACCES':
        logger.error(`${bind} requires elevated privileges`)
        process.exit(1)
      case 'EADDRINUSE':
        logger.error(`${bind} is already in use`)
        process.exit(1)
      default:
        throw error
    }
  })
  .listen(port)
