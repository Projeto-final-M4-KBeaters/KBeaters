import { Router } from "express";
import { listAllPerformersController, listUserController, registerUserController } from "../../controllers";
import { ensureDataIsValidMiddleware } from "../../middlewares";
import ensureIdIsValidMiddleware from "../../middlewares/ensureIdIsValid.middleware";

import { userSerializer } from "../../serializers/users";

const userRoutes = Router();

userRoutes.post('',ensureDataIsValidMiddleware(userSerializer), registerUserController)
userRoutes.get("/performer", listAllPerformersController);
userRoutes.get("/:id", ensureIdIsValidMiddleware, listUserController)

export { userRoutes };