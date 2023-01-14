import { Router } from "express";
import { listAllMusicsByGenrerController } from "../../controllers";
import { ensureExistsGenreMiddleware } from "../../middlewares";

const musicsRoutes = Router();

musicsRoutes.get("/genres/:id", ensureExistsGenreMiddleware, listAllMusicsByGenrerController)

export default musicsRoutes;