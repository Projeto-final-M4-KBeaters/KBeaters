"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.playlistsRoutes = exports.musicsRoutes = exports.adminRoutes = exports.genresRoutes = exports.loginRoutes = exports.userRoutes = void 0;
const users_routes_1 = __importDefault(require("./users/users.routes"));
exports.userRoutes = users_routes_1.default;
const login_routes_1 = __importDefault(require("./login/login.routes"));
exports.loginRoutes = login_routes_1.default;
const genres_routes_1 = __importDefault(require("./genres/genres.routes"));
exports.genresRoutes = genres_routes_1.default;
const admin_routes_1 = __importDefault(require("./admin/admin.routes"));
exports.adminRoutes = admin_routes_1.default;
const musics_routes_1 = __importDefault(require("./musics/musics.routes"));
exports.musicsRoutes = musics_routes_1.default;
const playlists_routes_1 = __importDefault(require("./playlists/playlists.routes"));
exports.playlistsRoutes = playlists_routes_1.default;
