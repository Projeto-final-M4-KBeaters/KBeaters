import { Router } from "express";
import { listAllMusicsByGenrerController, listAllMusicsController } from "../../controllers";
import { ensureExistsGenreMiddleware, ensureUUIDIsValidMiddleware } from "../../middlewares";

const musicsRoutes = Router();

musicsRoutes.get("/genres/:id", ensureUUIDIsValidMiddleware, ensureExistsGenreMiddleware, listAllMusicsByGenrerController)
musicsRoutes.get("", listAllMusicsController)

export default musicsRoutes;