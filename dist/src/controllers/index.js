"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeMusicsFromPlaylistController = exports.addMusicsToPlaylistController = exports.deletePlaylistController = exports.patchPlaylistsController = exports.listUserPlaylistController = exports.listUniquePlaylistController = exports.listAllPlaylistsController = exports.listAllAlbumsByPerformerController = exports.deleteAlbumController = exports.patchAlbumController = exports.addMusicToAlbumsController = exports.listAlbumController = exports.removeMusicFromAlbumController = exports.patchMusicsController = exports.musicsPostController = exports.registerAlbumController = exports.listUniqueMusicController = exports.listAllMusicsController = exports.listAllMusicsByPerformerController = exports.deleteMusicController = exports.listAllMusicsByGenrerController = exports.listUniqueGenreController = exports.createloginController = exports.reactivateUsersController = exports.patchUserController = exports.listUserController = exports.deleteUserController = exports.listAllUsersController = exports.listAllPerformersController = exports.registerUserController = void 0;
const deleteUser_controller_1 = __importDefault(require("./users/deleteUser.controller"));
exports.deleteUserController = deleteUser_controller_1.default;
const registerUser_controller_1 = __importDefault(require("./users/registerUser.controller"));
exports.registerUserController = registerUser_controller_1.default;
const listAllPerformers_controller_1 = __importDefault(require("./users/listAllPerformers.controller"));
exports.listAllPerformersController = listAllPerformers_controller_1.default;
const listUser_controller_1 = __importDefault(require("./users/listUser.controller"));
exports.listUserController = listUser_controller_1.default;
const listAllUsers_controller_1 = __importDefault(require("./users/listAllUsers.controller"));
exports.listAllUsersController = listAllUsers_controller_1.default;
const patchUsers_controller_1 = __importDefault(require("./users/patchUsers.controller"));
exports.patchUserController = patchUsers_controller_1.default;
const reactivateUsers_controller_1 = __importDefault(require("./users/reactivateUsers.controller"));
exports.reactivateUsersController = reactivateUsers_controller_1.default;
const login_controller_1 = __importDefault(require("./login/login.controller"));
exports.createloginController = login_controller_1.default;
const listUniqueGenre_controller_1 = __importDefault(require("./genres/listUniqueGenre.controller"));
exports.listUniqueGenreController = listUniqueGenre_controller_1.default;
const listAllMusicsByGenrer_controller_1 = __importDefault(require("./musics/listAllMusicsByGenrer.controller"));
exports.listAllMusicsByGenrerController = listAllMusicsByGenrer_controller_1.default;
const listAllMusics_controller_1 = __importDefault(require("./musics/listAllMusics.controller"));
exports.listAllMusicsController = listAllMusics_controller_1.default;
const listUniqueMusic_controller_1 = __importDefault(require("./musics/listUniqueMusic.controller"));
exports.listUniqueMusicController = listUniqueMusic_controller_1.default;
const musicsPost_controller_1 = __importDefault(require("./musics/musicsPost.controller"));
exports.musicsPostController = musicsPost_controller_1.default;
const deleteMusic_controller_1 = __importDefault(require("./musics/deleteMusic.controller"));
exports.deleteMusicController = deleteMusic_controller_1.default;
const listAllMusicsByPerformer_controller_1 = __importDefault(require("./musics/listAllMusicsByPerformer.controller"));
exports.listAllMusicsByPerformerController = listAllMusicsByPerformer_controller_1.default;
const registerAlbums_controller_1 = __importDefault(require("./albums/registerAlbums.controller"));
exports.registerAlbumController = registerAlbums_controller_1.default;
const patchMusic_controller_1 = __importDefault(require("./musics/patchMusic.controller"));
exports.patchMusicsController = patchMusic_controller_1.default;
const listAlbum_controller_1 = __importDefault(require("./albums/listAlbum.controller"));
exports.listAlbumController = listAlbum_controller_1.default;
const addMusicAlbums_controller_1 = __importDefault(require("./albums/addMusicAlbums.controller"));
exports.addMusicToAlbumsController = addMusicAlbums_controller_1.default;
const patchAlbums_controller_1 = __importDefault(require("./albums/patchAlbums.controller"));
exports.patchAlbumController = patchAlbums_controller_1.default;
const removeMusicAlbum_controller_1 = __importDefault(require("./albums/removeMusicAlbum.controller"));
exports.removeMusicFromAlbumController = removeMusicAlbum_controller_1.default;
const deleteAlbum_controller_1 = __importDefault(require("./albums/deleteAlbum.controller"));
exports.deleteAlbumController = deleteAlbum_controller_1.default;
const listAllAlbumsByPerformer_controller_1 = __importDefault(require("./albums/listAllAlbumsByPerformer.controller"));
exports.listAllAlbumsByPerformerController = listAllAlbumsByPerformer_controller_1.default;
const listAllPlaylists_controller_1 = __importDefault(require("./playlists/listAllPlaylists.controller"));
exports.listAllPlaylistsController = listAllPlaylists_controller_1.default;
const listUniquePlaylist_controller_1 = __importDefault(require("./playlists/listUniquePlaylist.controller"));
exports.listUniquePlaylistController = listUniquePlaylist_controller_1.default;
const listUserPlaylist_controller_1 = __importDefault(require("./playlists/listUserPlaylist.controller"));
exports.listUserPlaylistController = listUserPlaylist_controller_1.default;
const patchPlaylists_controller_1 = __importDefault(require("./playlists/patchPlaylists.controller"));
exports.patchPlaylistsController = patchPlaylists_controller_1.default;
const deletePlaylist_controller_1 = __importDefault(require("./playlists/deletePlaylist.controller"));
exports.deletePlaylistController = deletePlaylist_controller_1.default;
const addMusicsToPlaylist_controller_1 = __importDefault(require("./playlists/addMusicsToPlaylist.controller"));
exports.addMusicsToPlaylistController = addMusicsToPlaylist_controller_1.default;
const removeMusicsFromPlaylist_controller_1 = __importDefault(require("./playlists/removeMusicsFromPlaylist.controller"));
exports.removeMusicsFromPlaylistController = removeMusicsFromPlaylist_controller_1.default;
