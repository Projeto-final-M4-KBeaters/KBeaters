import { Router } from "express";
import { listAllPerformersController, listUserController, deleteUserController, listAllUsersController, registerUserController } from "../../controllers";
import { ensureDataIsValidMiddleware } from "../../middlewares";
import { userSerializer } from "../../serializers/users";

const userRoutes = Router();

userRoutes.post('',ensureDataIsValidMiddleware(userSerializer), registerUserController)
userRoutes.get("/:id", ensureIdIsValidMiddleware, listUserController)
userRoutes.get('', listAllUsersController);
userRoutes.get('/performer', listAllPerformersController);
userRoutes.delete('/:id', deleteUserController)
export default userRoutes