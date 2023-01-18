import { Router } from "express";
import { listAllPlaylistsController, listUserPlaylistController, listUniquePlaylistController, patchPlaylistsController } from "../../controllers";
import addMusicsToPlaylistController from "../../controllers/playlists/addMusicsToPlaylist.controller";
import registerPlaylistsController from "../../controllers/playlists/registerPlaylists.controller";
import { ensureAdminOrOwnerPlaylistMiddleware, ensureAuthMiddleware, ensureDataIsValidMiddleware, ensurePlaylistExistsMiddleware, ensureUUIDIsValidMiddleware } from "../../middlewares";
import { playlistAddMusicSerializer, playlistPostSerializer } from "../../serializers/playlists";

const playlistsRoutes = Router();

playlistsRoutes.post("",  ensureAuthMiddleware, ensureDataIsValidMiddleware(playlistPostSerializer), registerPlaylistsController)
playlistsRoutes.post("/:id", ensureAuthMiddleware, ensureDataIsValidMiddleware(playlistAddMusicSerializer), ensurePlaylistExistsMiddleware, ensureAdminOrOwnerPlaylistMiddleware, addMusicsToPlaylistController)
playlistsRoutes.get("", listAllPlaylistsController)
playlistsRoutes.get("/:id", ensurePlaylistExistsMiddleware, listUniquePlaylistController)
playlistsRoutes.get("/users/:id", ensureAuthMiddleware, listUserPlaylistController)
playlistsRoutes.patch("/:id", ensureAuthMiddleware, ensureUUIDIsValidMiddleware,ensureDataIsValidMiddleware(playlistPostSerializer), ensurePlaylistExistsMiddleware, ensureAdminOrOwnerPlaylistMiddleware, patchPlaylistsController)


export default playlistsRoutes;

