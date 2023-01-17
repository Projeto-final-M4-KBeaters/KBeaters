import { Router } from "express";
import { listAllPlaylistsController, listUniquePlaylistController } from "../../controllers";
import registerPlaylistsController from "../../controllers/playlists/registerPlaylists.controller";
import { ensureAuthMiddleware, ensureDataIsValidMiddleware, ensurePlaylistExistsMiddleware } from "../../middlewares";
import { playlistPostSerializer } from "../../serializers/playlists";

const playlistsRoutes = Router();

playlistsRoutes.post("",  ensureAuthMiddleware, ensureDataIsValidMiddleware(playlistPostSerializer), registerPlaylistsController)
playlistsRoutes.get("", listAllPlaylistsController)
playlistsRoutes.get("/:id", ensurePlaylistExistsMiddleware, listUniquePlaylistController)

export default playlistsRoutes;

