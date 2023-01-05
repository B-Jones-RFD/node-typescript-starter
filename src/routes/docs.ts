import { Router } from 'express'
import swaggerUi from 'swagger-ui-express'
import { openApiSpec } from '~/schema/openApi'

const router = Router()

/**
 * Configure Swagger UI route
 * @see https://www.npmjs.com/package/swagger-ui-express
 */

router.use('/', swaggerUi.serve)
router.get('/', swaggerUi.setup(openApiSpec))

export default router
