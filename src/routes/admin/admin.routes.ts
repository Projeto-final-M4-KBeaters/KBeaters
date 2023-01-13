import { Router } from "express";
import registerAdminController from "../../controllers/admin/registerAdmin.controller";
import { ensureAuthAdminMiddleware, ensureAuthMiddleware, ensureDataIsValidMiddleware } from "../../middlewares";
import { adminRequestSerializer } from "../../serializers/admin";

const adminRoutes = Router();

adminRoutes.post(
    "",
    ensureDataIsValidMiddleware(adminRequestSerializer),
    registerAdminController
);

export default adminRoutes;