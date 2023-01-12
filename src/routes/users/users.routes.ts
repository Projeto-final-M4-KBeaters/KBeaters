import { Router } from "express";
import { listAllPerformersController, listAllUsersController, registerUserController } from "../../controllers";
import { ensureDataIsValidMiddleware } from "../../middlewares";

import { userSerializer } from "../../serializers/users";

const userRoutes = Router();

userRoutes.post('',ensureDataIsValidMiddleware(userSerializer), registerUserController)
userRoutes.get('', listAllUsersController);
userRoutes.get('/performer', listAllPerformersController);


export default userRoutes