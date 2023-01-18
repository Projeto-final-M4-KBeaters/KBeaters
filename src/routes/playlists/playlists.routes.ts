import { Router } from "express";
import { listAllPlaylistsController, listUserPlaylistController, listUniquePlaylistController, patchPlaylistsController, deletePlaylistController } from "../../controllers";
import registerPlaylistsController from "../../controllers/playlists/registerPlaylists.controller";
import { ensureAdminOrOwnerPlaylistMiddleware, ensureAuthMiddleware, ensureDataIsValidMiddleware, ensurePlaylistExistsMiddleware, ensureUserIdPlaylistIsValidMiddleware, ensureUUIDIsValidMiddleware } from "../../middlewares";
import { playlistPostSerializer } from "../../serializers/playlists";

const playlistsRoutes = Router();

playlistsRoutes.post("",  ensureAuthMiddleware, ensureDataIsValidMiddleware(playlistPostSerializer), registerPlaylistsController)
playlistsRoutes.get("", listAllPlaylistsController)
playlistsRoutes.get("/:id", ensurePlaylistExistsMiddleware, listUniquePlaylistController)
playlistsRoutes.get("/users/:id", ensureUUIDIsValidMiddleware, ensureUserIdPlaylistIsValidMiddleware, listUserPlaylistController)
playlistsRoutes.patch("/:id", ensureAuthMiddleware, ensureUUIDIsValidMiddleware, ensureDataIsValidMiddleware(playlistPostSerializer), ensurePlaylistExistsMiddleware, ensureAdminOrOwnerPlaylistMiddleware, patchPlaylistsController)
playlistsRoutes.delete("/:id", ensureAuthMiddleware, ensureAdminOrOwnerPlaylistMiddleware, ensurePlaylistExistsMiddleware,deletePlaylistController)

export default playlistsRoutes;

