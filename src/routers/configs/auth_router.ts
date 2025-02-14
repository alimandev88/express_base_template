import { Router } from 'express'
import c from '../../controllers/auth_controller'

const route = Router()

route.post('/auth', c.auth)

export default route
