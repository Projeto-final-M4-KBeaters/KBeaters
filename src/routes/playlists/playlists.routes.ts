import { Router } from "express";
import registerPlaylistsController from "../../controllers/playlists/registerPlaylists.controller";
import { ensureAuthMiddleware, ensureDataIsValidMiddleware } from "../../middlewares";
import { playlistPostSerializer } from "../../serializers/playlists";

const playlistsRoutes = Router();

playlistsRoutes.post("",  ensureAuthMiddleware, ensureDataIsValidMiddleware(playlistPostSerializer), registerPlaylistsController)


export default playlistsRoutes;

