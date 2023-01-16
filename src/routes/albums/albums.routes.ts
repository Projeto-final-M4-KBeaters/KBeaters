import { Router } from "express";
import { registerAlbumController } from "../../controllers";
import listAllAlbumsController from "../../controllers/albums/listAllAlbums.controller";
import { ensureAuthIsPerformerMiddleware, ensureAuthMiddleware, ensureDataIsValidMiddleware } from "../../middlewares";
import { albumPostSerializer } from "../../serializers/albums";


const albumsRoutes = Router();

albumsRoutes.post("", ensureAuthMiddleware, ensureAuthIsPerformerMiddleware, ensureDataIsValidMiddleware(albumPostSerializer), registerAlbumController)
albumsRoutes.get("", listAllAlbumsController)



export default albumsRoutes;