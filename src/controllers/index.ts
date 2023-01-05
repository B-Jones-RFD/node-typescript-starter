import type { Request, Response, NextFunction } from 'express'
import createHttpError from 'http-errors'

export function getEcho(req: Request, res: Response, next: NextFunction) {
  const successMessage = 'Successful communication with service'
  try {
    res.send(successMessage)
  } catch (err) {
    next(new createHttpError.InternalServerError(`Error in echo: ${err}`))
  }
}
