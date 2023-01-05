import type { Logger } from 'winston'
/**
 * @see https://expressjs.com/
 */
import express from 'express'

/**
 * @see https://github.com/bithavoc/express-winston
 */
import expressWinston from 'express-winston'
import cors from 'cors'
import statusMonitor from 'express-status-monitor'
import { join } from 'path'
import problemMiddleware from '~/middleware/problemResponse'
import indexRoutes from '~/routes/index'
import docsRoute from '~/routes/docs'

const createApp = (logger: Logger) => {
  const app = express()
  const publicPath = join(process.cwd(), 'public')

  app.locals.logger = logger

  return app
    .use(
      expressWinston.logger({
        winstonInstance: logger,
        msg: '{{res.statusCode}} {{req.method}} {{req.url}} {{res.responseTime}}ms',
        meta: false,
      })
    )
    .use(express.urlencoded({ extended: true }))
    .use(express.json({ limit: '1mb' }))
    .use(express.raw({ limit: '1mb' }))
    .use(express.text({ limit: '1mb' }))
    .use(cors({ exposedHeaders: ['authorization'], maxAge: 10000 }))
    .use('/', indexRoutes)
    .use('/api/docs', docsRoute)
    .use('/public', express.static(publicPath))
    .use(statusMonitor())
    .use(problemMiddleware)
}

export default createApp
