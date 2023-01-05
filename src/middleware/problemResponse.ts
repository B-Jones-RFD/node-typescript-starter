import type { Request, Response, NextFunction } from 'express'
import type { HttpError } from 'http-errors'

/**
 * @see https://github.com/jshttp/http-errors
 */
import createHttpError from 'http-errors'

interface AppError extends Error {
  statusCode: string
}

type ProblemDetails = {
  type: string
  status: number
  title?: string
  details?: string
  errors?: unknown
}

type ProblemType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  matchErrorClass: any
  details: ProblemDetails
}

const defaultProblemDetails: ProblemDetails = {
  type: 'about:blank',
  status: 500,
}

const problemTypes: ProblemType[] = [
  {
    matchErrorClass: createHttpError.BadRequest,
    details: {
      type: 'https://example-api.com/problem/invalid-request',
      title: 'Invalid Request',
      status: 400,
    },
  },
  {
    matchErrorClass: createHttpError.Unauthorized,
    details: {
      type: 'https://example-api.com/problem/unauthorized',
      title: 'Not Authorized',
      status: 401,
    },
  },
  {
    matchErrorClass: createHttpError.Forbidden,
    details: {
      type: 'https://example-api.com/problem/unauthorized',
      title: 'Forbidden',
      status: 403,
    },
  },
  {
    matchErrorClass: createHttpError.InternalServerError,
    details: {
      type: 'https://example-api.com/problem/internal-error',
      title: 'Internal Server Error',
      status: 500,
    },
  },
  {
    matchErrorClass: createHttpError.NotImplemented,
    details: {
      type: 'https://example-api.com/problem/not-implemented',
      title: 'Not Implemented',
      status: 501,
    },
  },
]

/**
 * Get the problem details which have been defined for an error.
 */
function getProblemDetailsForError(error: HttpError | Error): ProblemDetails {
  const problemType = problemTypes.find(
    (problemType) => error instanceof problemType.matchErrorClass
  )

  return problemType ? problemType.details : defaultProblemDetails
}

/**
 * Send an error response using the problem details format.
 * @see https://tools.ietf.org/html/rfc7807
 */
const problemDetailsResponseMiddleware = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /**
   * If response headers have already been sent,
   * delegate to the default Express error handler.
   */
  if (res.headersSent) {
    return next(err)
  }

  const problemDetails = getProblemDetailsForError(err)

  if (!problemDetails.status) {
    problemDetails.status = parseInt(err.statusCode) ?? 500
  }

  if ('message' in err) {
    problemDetails.details = err.message
  }

  req.app.locals.logger.error(JSON.stringify(problemDetails, null, 2))

  /**
   * Set the correct media type for a response containing a
   * JSON formatted problem details object.
   *
   * @see https://tools.ietf.org/html/rfc7807#section-3
   */
  res
    .set('Content-Type', 'application/problem+json')
    .status(problemDetails.status)
    .json(problemDetails)

  next()
}

export default problemDetailsResponseMiddleware
