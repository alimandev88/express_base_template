import { Express } from 'express'
import userRouter from './configs/user_router'
import authRouter from './configs/auth_router'

export default {
    notUseMiddleware : function (app : Express) {
       app.use(authRouter)
      
    },
    useAuthMiddleware : function (app : Express) {
        app.use(userRouter)
    },
}
