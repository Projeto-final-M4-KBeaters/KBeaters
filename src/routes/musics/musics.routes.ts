import { Router } from "express";
import { listAllMusicsByGenrerController, listAllMusicsByPerformerController, musicsPostController, listUniqueMusicController, listAllMusicsController } from "../../controllers";
import { ensureAuthIsPerformerMiddleware, ensureAuthMiddleware, ensureDataIsValidMiddleware, ensureExistsGenreMiddleware, ensureMusicNameNotExistsMiddleware, ensureUUIDIsValidMiddleware } from "../../middlewares";
import { musicsRequestSerializer } from "../../serializers/musics";

const musicsRoutes = Router();

musicsRoutes.get("/genres/:id", ensureUUIDIsValidMiddleware, ensureExistsGenreMiddleware, listAllMusicsByGenrerController)
musicsRoutes.get("", listAllMusicsController)
musicsRoutes.get(":id", ensureUUIDIsValidMiddleware, listUniqueMusicController)
musicsRoutes.post(
    "",
    ensureAuthMiddleware,
    ensureAuthIsPerformerMiddleware,
    ensureDataIsValidMiddleware(musicsRequestSerializer),
    ensureMusicNameNotExistsMiddleware,
    musicsPostController
)
musicsRoutes.get("/performer/:id", ensureUUIDIsValidMiddleware,  listAllMusicsByPerformerController)

export default musicsRoutes;