import { Application } from 'express'
import logger from '../logger'
import createApp from '../setup/createExpressApp'

let app: Application | undefined
/**
 * @see https://github.com/visionmedia/supertest
 */
export const initializeApp = () => {
  if (!app) {
    app = createApp(logger)
  }
}

initializeApp()

export default app
