import { Router } from "express";
import { listAllPerformersController, listUserController, deleteUserController, listAllUsersController, registerUserController } from "../../controllers";
import { ensureAuthAdminMiddleware, ensureAuthMiddleware, ensureDataIsValidMiddleware } from "../../middlewares";
import ensureIdIsValidMiddleware from "../../middlewares/ensureIdIsValid.middleware";
import { userSerializer } from "../../serializers/users";

const userRoutes = Router();

userRoutes.post('',ensureDataIsValidMiddleware(userSerializer), registerUserController)
userRoutes.get("/:id", ensureIdIsValidMiddleware, listUserController)
userRoutes.get('', listAllUsersController);
userRoutes.get('/performer', listAllPerformersController);
userRoutes.delete('/:id', ensureAuthMiddleware, ensureAuthAdminMiddleware, ensureIdIsValidMiddleware, deleteUserController)
export default userRoutes