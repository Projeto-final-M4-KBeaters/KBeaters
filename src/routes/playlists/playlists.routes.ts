import { Router } from "express";
import { listAllPlaylistsController, listUserPlaylistController, listUniquePlaylistController, patchPlaylistsController, deletePlaylistController, addMusicsToPlaylistController, removeMusicsFromPlaylistController } from "../../controllers";
import registerPlaylistsController from "../../controllers/playlists/registerPlaylists.controller";
import { ensureAdminOrOwnerPlaylistMiddleware, ensureAuthMiddleware, ensureDataIsValidMiddleware, ensurePlaylistExistsMiddleware, ensureUserIdPlaylistIsValidMiddleware, ensureUUIDIsValidMiddleware } from "../../middlewares";
import { playlistAddMusicSerializer, playlistPostSerializer } from "../../serializers/playlists";

const playlistsRoutes = Router();

playlistsRoutes.post("",  ensureAuthMiddleware, ensureDataIsValidMiddleware(playlistPostSerializer), registerPlaylistsController)
playlistsRoutes.post("/add/:id", ensureAuthMiddleware, ensureDataIsValidMiddleware(playlistAddMusicSerializer), ensureUUIDIsValidMiddleware, ensurePlaylistExistsMiddleware, ensureAdminOrOwnerPlaylistMiddleware, addMusicsToPlaylistController)
playlistsRoutes.get("", listAllPlaylistsController)
playlistsRoutes.get("/:id", ensurePlaylistExistsMiddleware, listUniquePlaylistController)
playlistsRoutes.get("/users/:id", ensureUUIDIsValidMiddleware, ensureUserIdPlaylistIsValidMiddleware, listUserPlaylistController)
playlistsRoutes.patch("/:id", ensureAuthMiddleware, ensureUUIDIsValidMiddleware, ensureDataIsValidMiddleware(playlistPostSerializer), ensurePlaylistExistsMiddleware, ensureAdminOrOwnerPlaylistMiddleware, patchPlaylistsController)
playlistsRoutes.delete("/:id", ensureAuthMiddleware, ensureAdminOrOwnerPlaylistMiddleware, ensurePlaylistExistsMiddleware,deletePlaylistController)
playlistsRoutes.delete("/remove/:id", ensureAuthMiddleware, ensureDataIsValidMiddleware(playlistAddMusicSerializer), ensureUUIDIsValidMiddleware, ensurePlaylistExistsMiddleware, ensureAdminOrOwnerPlaylistMiddleware, removeMusicsFromPlaylistController)

export default playlistsRoutes;

