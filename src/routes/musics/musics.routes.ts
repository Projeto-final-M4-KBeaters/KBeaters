import { Router } from "express";
import { deleteMusicController, listAllMusicsByGenrerController, musicsPostController } from "../../controllers";
import { ensureAuthIsAdmOrOwnerMiddleware, ensureAuthIsPerformerMiddleware, ensureAuthMiddleware, ensureDataIsValidMiddleware, ensureExistsGenreMiddleware, ensureMusicNameNotExistsMiddleware, ensureUUIDIsValidMiddleware } from "../../middlewares";
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
musicsRoutes.delete("/:id",ensureAuthMiddleware, ensureAuthIsAdmOrOwnerMiddleware, deleteMusicController)


export default musicsRoutes;