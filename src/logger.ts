/**
 * @see https://github.com/winstonjs/winston
 */
import {
  createLogger,
  format as _format,
  transports as _transports,
} from 'winston'

const level = process.env.NODE_ENV === 'production' ? 'error' : 'info'

/**
 * @class Logger
 * @classdesc Winston logger
 */
const logger = createLogger({
  level,
  format: _format.simple(),
  defaultMeta: { service: 'grid-echo-ui' },
  transports: [new _transports.Console()],
})

export default logger
