import { Router } from "express";
import { listAllPerformersController, listUserController, deleteUserController, listAllUsersController, registerUserController, patchUserController } from "../../controllers";
import { ensureAuthAdminMiddleware, ensureAuthAdminOrSelfMiddleware, ensureAuthMiddleware, ensureBodyExistsMiddleware, ensureDataIsValidMiddleware, ensureEmailNotExistsMiddleware, ensureIdIsValidMiddleware, ensureUserIsActiveMiddleware } from "../../middlewares";
import { userPatchRequestSerializer, userSerializer } from "../../serializers/users";

const userRoutes = Router();

userRoutes.post("",ensureDataIsValidMiddleware(userSerializer), registerUserController)
userRoutes.get("/:id", ensureIdIsValidMiddleware, listUserController)
userRoutes.get("", listAllUsersController)
userRoutes.get("/performer", listAllPerformersController);
userRoutes.delete("/:id", ensureAuthMiddleware, ensureAuthAdminMiddleware, ensureIdIsValidMiddleware, ensureUserIsActiveMiddleware, deleteUserController)
userRoutes.patch("/:id", ensureDataIsValidMiddleware(userPatchRequestSerializer), ensureAuthMiddleware, ensureAuthAdminOrSelfMiddleware, ensureBodyExistsMiddleware, ensureIdIsValidMiddleware, ensureEmailNotExistsMiddleware, patchUserController)

export default userRoutes;