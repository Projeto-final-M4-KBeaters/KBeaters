import { Router } from "express";
import { registerAlbumController } from "../../controllers";
import { ensureAuthIsPerformerMiddleware, ensureAuthMiddleware, ensureDataIsValidMiddleware } from "../../middlewares";
import { albumPostSerializer } from "../../serializers/albums";


const albumsRoutes = Router();

albumsRoutes.post("", ensureAuthMiddleware, ensureAuthIsPerformerMiddleware, ensureDataIsValidMiddleware(albumPostSerializer), registerAlbumController)




export default albumsRoutes;