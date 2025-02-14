import { Router } from 'express'
import c from '../../controllers/users_controller'

const route = Router()

route.post('/users/add', c.post)
route.post('/users/update/:id', c.update)
route.get('/users', c.getMany)
route.get('/users/:id', c.getOne)
route.post('/users/delete', c.drop)

export default route
