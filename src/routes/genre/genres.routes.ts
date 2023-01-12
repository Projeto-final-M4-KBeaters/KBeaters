import { Router } from "express";
import genrePostController from "../../controllers/genres/genresPost.controller";
import { ensureAuthAdminMiddleware, ensureAuthMiddleware, ensureDataIsValidMiddleware, ensureGenreNotExistMiddleware } from "../../middlewares";
import { genrePostSerializer } from "../../serializers/genres";

const genresRoutes = Router();

genresRoutes.post(
    "", 
    ensureAuthMiddleware, 
    ensureAuthAdminMiddleware,
    ensureDataIsValidMiddleware(genrePostSerializer),
    ensureGenreNotExistMiddleware,
    genrePostController
)

export default genresRoutes;