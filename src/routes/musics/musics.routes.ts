import { Router } from "express";
import { listAllMusicsByGenrerController, musicsPostController } from "../../controllers";
import { ensureAuthIsPerformerMiddleware, ensureAuthMiddleware, ensureDataIsValidMiddleware, ensureExistsGenreMiddleware, ensureMusicNameNotExistsMiddleware, ensureUUIDIsValidMiddleware } from "../../middlewares";
import { musicsRequestSerializer } from "../../serializers/musics";

const musicsRoutes = Router();

musicsRoutes.get("/genres/:id", ensureUUIDIsValidMiddleware, ensureExistsGenreMiddleware, listAllMusicsByGenrerController)
musicsRoutes.post(
    "",
    ensureAuthMiddleware,
    ensureAuthIsPerformerMiddleware,
    ensureDataIsValidMiddleware(musicsRequestSerializer),
    ensureMusicNameNotExistsMiddleware,
    musicsPostController
)


export default musicsRoutes;