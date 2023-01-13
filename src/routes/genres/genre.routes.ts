import { Router } from "express";
import { ensureAuthAdminMiddleware, ensureAuthMiddleware } from "../../middlewares";
import {listUniqueGenreController} from "../../controllers"

const genreRoutes = Router()


genreRoutes.get("/:data",ensureAuthMiddleware, ensureAuthAdminMiddleware, listUniqueGenreController)