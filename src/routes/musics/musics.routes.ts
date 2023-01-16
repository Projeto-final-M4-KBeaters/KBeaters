import { Router } from "express";
import { listAllMusicsByGenrerController, deleteMusicController, listAllMusicsByPerformerController, musicsPostController, listUniqueMusicController, listAllMusicsController } from "../../controllers";
import { ensureAuthIsAdmOrOwnerMiddleware, ensureAuthIsPerformerMiddleware, ensureAuthMiddleware, ensureDataIsValidMiddleware, ensureExistsGenreMiddleware, ensureMusicNameNotExistsMiddleware, ensureUUIDIsValidMiddleware } from "../../middlewares";
import { musicsRequestSerializer } from "../../serializers/musics";

const musicsRoutes = Router();

musicsRoutes.post("", ensureAuthMiddleware, ensureAuthIsPerformerMiddleware, ensureDataIsValidMiddleware(musicsRequestSerializer), ensureMusicNameNotExistsMiddleware, musicsPostController)
musicsRoutes.get("", listAllMusicsController)
musicsRoutes.get("/genres/:id", ensureUUIDIsValidMiddleware, ensureExistsGenreMiddleware, listAllMusicsByGenrerController)
musicsRoutes.get("/performer/:id", ensureUUIDIsValidMiddleware,  listAllMusicsByPerformerController)
musicsRoutes.get("/:id", ensureUUIDIsValidMiddleware, listUniqueMusicController)
musicsRoutes.delete("/:id",ensureAuthMiddleware, ensureAuthIsAdmOrOwnerMiddleware, deleteMusicController)

export default musicsRoutes;