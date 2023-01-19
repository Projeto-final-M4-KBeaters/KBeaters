"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../../controllers");
const genresPost_controller_1 = __importDefault(require("../../controllers/genres/genresPost.controller"));
const listAllGenres_controller_1 = __importDefault(require("../../controllers/genres/listAllGenres.controller"));
const middlewares_1 = require("../../middlewares");
const genres_1 = require("../../serializers/genres");
const genresRoutes = (0, express_1.Router)();
genresRoutes.post("", middlewares_1.ensureAuthMiddleware, middlewares_1.ensureAuthAdminMiddleware, (0, middlewares_1.ensureDataIsValidMiddleware)(genres_1.genrePostSerializer), middlewares_1.ensureGenreNotExistMiddleware, genresPost_controller_1.default);
genresRoutes.get("/:data", controllers_1.listUniqueGenreController);
genresRoutes.get("", listAllGenres_controller_1.default);
exports.default = genresRoutes;
