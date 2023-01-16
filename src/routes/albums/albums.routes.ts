import { Router } from "express";
import { addMusicToAlbumsController, registerAlbumController } from "../../controllers";
import listAllAlbumsController from "../../controllers/albums/listAllAlbums.controller";
import { ensureAuthIsAdmOrOwnerMiddleware, ensureAuthIsAdmOrOwnerProvidedMiddleware, ensureAuthIsPerformerMiddleware, ensureAuthMiddleware, ensureDataIsValidMiddleware } from "../../middlewares";
import { albumPostSerializer } from "../../serializers/albums";


const albumsRoutes = Router();

albumsRoutes.post("", ensureAuthMiddleware, ensureAuthIsPerformerMiddleware, ensureDataIsValidMiddleware(albumPostSerializer), registerAlbumController)
albumsRoutes.post("/add/:id", ensureAuthMiddleware,ensureAuthIsPerformerMiddleware,ensureAuthIsAdmOrOwnerProvidedMiddleware,addMusicToAlbumsController)
albumsRoutes.get("", listAllAlbumsController)



export default albumsRoutes;