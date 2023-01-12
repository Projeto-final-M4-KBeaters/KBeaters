import { Router } from "express"
import { deleteUserController, registerUserController } from "../../controllers"
import { ensureDataIsValidMiddleware } from "../../middlewares"

import { userSerializer } from "../../serializers/users"


const userRoutes = Router()

userRoutes.post('',ensureDataIsValidMiddleware(userSerializer), registerUserController)
userRoutes.delete('/:id', deleteUserController)

export default userRoutes