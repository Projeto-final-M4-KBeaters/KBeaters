import { Router } from "express";
import { listAllPerformersController, listUserController, deleteUserController, listAllUsersController, registerUserController, patchUserController, reactivateUsersController } from "../../controllers";
import { ensureAuthAdminOrSelfMiddleware, ensureAuthMiddleware, ensureBodyExistsMiddleware, ensureDataIsValidMiddleware, ensureEmailNotExistsMiddleware, ensureUserIdIsValidMiddleware, ensureUserIsActiveMiddleware } from "../../middlewares";
import { loginSerializer, userPatchRequestSerializer, userSerializer } from "../../serializers/users";

const userRoutes = Router();

userRoutes.post("",ensureDataIsValidMiddleware(userSerializer), registerUserController)
userRoutes.get("", listAllUsersController)
userRoutes.get("/performer", listAllPerformersController);
userRoutes.get("/:id", ensureUserIdIsValidMiddleware, listUserController)
userRoutes.patch("/reactivate", ensureDataIsValidMiddleware(loginSerializer), reactivateUsersController)
userRoutes.delete("/:id", ensureAuthMiddleware, ensureAuthAdminOrSelfMiddleware, ensureUserIdIsValidMiddleware, ensureUserIsActiveMiddleware, deleteUserController)
userRoutes.patch("/:id", ensureDataIsValidMiddleware(userPatchRequestSerializer), ensureAuthMiddleware, ensureAuthAdminOrSelfMiddleware, ensureBodyExistsMiddleware, ensureUserIdIsValidMiddleware, ensureEmailNotExistsMiddleware, patchUserController)

export default userRoutes;