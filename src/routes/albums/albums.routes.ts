import { Router } from "express";
import {listAlbumController, addMusicToAlbumsController, registerAlbumController, patchAlbumController, listAllAlbumsByPerformerController, deleteAlbumController } from "../../controllers";
import listAllAlbumsController from "../../controllers/albums/listAllAlbums.controller";
import { ensureAuthIsAdmOrOwnerMiddleware, ensureAuthIsAdmOrOwnerProvidedMiddleware, ensureUUIDIsValidMiddleware, ensureAuthIsPerformerMiddleware, ensureAuthMiddleware, ensureDataIsValidMiddleware, ensureUserToBeSearchedIsPerformerMiddleware } from "../../middlewares";
import { albumPostSerializer } from "../../serializers/albums";


const albumsRoutes = Router();

albumsRoutes.post("", ensureAuthMiddleware, ensureAuthIsPerformerMiddleware, ensureDataIsValidMiddleware(albumPostSerializer), registerAlbumController)
albumsRoutes.get("", listAllAlbumsController)
albumsRoutes.get("/:id", ensureUUIDIsValidMiddleware, listAlbumController)
albumsRoutes.get("/performer/:id",ensureUUIDIsValidMiddleware, ensureUserToBeSearchedIsPerformerMiddleware, listAllAlbumsByPerformerController )
albumsRoutes.post("/add/:id", ensureAuthMiddleware,ensureAuthIsPerformerMiddleware,ensureAuthIsAdmOrOwnerProvidedMiddleware,addMusicToAlbumsController)
albumsRoutes.patch("/:id", patchAlbumController)
albumsRoutes.delete("/:id", ensureAuthMiddleware, ensureUUIDIsValidMiddleware, deleteAlbumController)


export default albumsRoutes;