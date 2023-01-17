import { Router } from "express";
<<<<<<< HEAD
import {listAlbumController, addMusicToAlbumsController, registerAlbumController, patchAlbumController } from "../../controllers";
=======
import {listAlbumController, addMusicToAlbumsController, registerAlbumController, listAllAlbumsByPerformerController, deleteAlbumController } from "../../controllers";
>>>>>>> 38d0aa421984a03072684dbc9dbbfd31027aff17
import listAllAlbumsController from "../../controllers/albums/listAllAlbums.controller";
import { ensureAuthIsAdmOrOwnerMiddleware, ensureAuthIsAdmOrOwnerProvidedMiddleware, ensureUUIDIsValidMiddleware, ensureAuthIsPerformerMiddleware, ensureAuthMiddleware, ensureDataIsValidMiddleware, ensureUserToBeSearchedIsPerformerMiddleware } from "../../middlewares";
import { albumPostSerializer } from "../../serializers/albums";


const albumsRoutes = Router();

albumsRoutes.post("", ensureAuthMiddleware, ensureAuthIsPerformerMiddleware, ensureDataIsValidMiddleware(albumPostSerializer), registerAlbumController)
albumsRoutes.get("", listAllAlbumsController)
albumsRoutes.get("/:id", ensureUUIDIsValidMiddleware, listAlbumController)
albumsRoutes.get("/performer/:id",ensureUUIDIsValidMiddleware, ensureUserToBeSearchedIsPerformerMiddleware, listAllAlbumsByPerformerController )
albumsRoutes.post("/add/:id", ensureAuthMiddleware,ensureAuthIsPerformerMiddleware,ensureAuthIsAdmOrOwnerProvidedMiddleware,addMusicToAlbumsController)
<<<<<<< HEAD
albumsRoutes.patch("/:id", patchAlbumController)
=======
albumsRoutes.delete("/:id", ensureAuthMiddleware, ensureUUIDIsValidMiddleware, deleteAlbumController)
>>>>>>> 38d0aa421984a03072684dbc9dbbfd31027aff17


export default albumsRoutes;