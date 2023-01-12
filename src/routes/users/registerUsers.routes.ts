import { Router } from "express"
import { registerUserController } from "../../controllers"
import { ensureDataIsValidMiddleware } from "../../middlewares"

import { userSerializer } from "../../serializers/users"


const userRoutes = Router()

userRoutes.post('',ensureDataIsValidMiddleware(userSerializer), registerUserController)

export default userRoutes