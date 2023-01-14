import { Router } from "express";
import { listAllMusicsByGenrerController } from "../../controllers";
import { ensureExistsGenreMiddleware, ensureUUIDIsValidMiddleware } from "../../middlewares";

const musicsRoutes = Router();

musicsRoutes.get("/genres/:id", ensureUUIDIsValidMiddleware, ensureExistsGenreMiddleware, listAllMusicsByGenrerController)

export default musicsRoutes;