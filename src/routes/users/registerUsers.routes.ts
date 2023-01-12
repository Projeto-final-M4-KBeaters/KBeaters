import { Router } from "express";
import listAllPerformersController from "../../controllers/users/listAllPerformers.controller";
import createUserController from "../../controllers/users/registerUser.controller";
import { ensureDataIsValidMiddleware } from "../../middlewares/ensureDataIsValid.middleware";
import { userSerializer } from "../../serializers/users";

const userRoutes = Router();

userRoutes.post(
  "",
  ensureDataIsValidMiddleware(userSerializer),
  createUserController
);
userRoutes.get("/performer", listAllPerformersController);

export { userRoutes };
