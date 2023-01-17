import { Router } from "express";
import { listAllPlaylistsController, listUserPlaylistController } from "../../controllers";
import registerPlaylistsController from "../../controllers/playlists/registerPlaylists.controller";
import { ensureAuthMiddleware, ensureDataIsValidMiddleware } from "../../middlewares";
import { playlistPostSerializer } from "../../serializers/playlists";

const playlistsRoutes = Router();

playlistsRoutes.post("",  ensureAuthMiddleware, ensureDataIsValidMiddleware(playlistPostSerializer), registerPlaylistsController)
playlistsRoutes.get("", ensureAuthMiddleware, listAllPlaylistsController)
playlistsRoutes.get("/:id", ensureAuthMiddleware, listUserPlaylistController)

export default playlistsRoutes;

