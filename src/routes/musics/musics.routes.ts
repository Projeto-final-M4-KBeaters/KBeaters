import { Router } from "express";
import { listAllMusicsByGenrerController, listUniqueMusicController } from "../../controllers";
import { ensureExistsGenreMiddleware, ensureUUIDIsValidMiddleware } from "../../middlewares";

const musicsRoutes = Router();

musicsRoutes.get("/genres/:id", ensureUUIDIsValidMiddleware, ensureExistsGenreMiddleware, listAllMusicsByGenrerController)
musicsRoutes.get(":id", ensureUUIDIsValidMiddleware, listUniqueMusicController)


export default musicsRoutes;