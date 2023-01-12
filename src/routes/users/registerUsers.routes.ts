import { Router } from "express"
import { createUserController } from "../../controllers/users/registerUser.controller"
import { ensureDataIsValidMiddleware } from "../../middlewares/ensureDataIsValid.middleware"
import { userSerializer } from "../../serializers/users"


const userRoutes = Router()

userRoutes.post('',ensureDataIsValidMiddleware(userSerializer), createUserController)

export {userRoutes}