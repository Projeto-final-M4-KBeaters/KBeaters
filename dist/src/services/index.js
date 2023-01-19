"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeMusicsFromPlaylistsService = exports.addMusicsToPlaylistService = exports.deletePLaylistService = exports.patchPlaylistsService = exports.listUserPlaylistService = exports.listUniquePlaylistService = exports.listAllPlaylistsService = exports.registerPlaylistsService = exports.listAllAlbumsByPerformerService = exports.deleteAlbumService = exports.removeMusicFromAlbumService = exports.patchAlbumService = exports.addMusicsToAlbumService = exports.listAllAlbumsService = exports.listAlbumService = exports.patchMusicService = exports.registerAlbumService = exports.listUniqueMusicService = exports.listAllMusicsService = exports.listAllMusicsByPerformerService = exports.deleteMusicService = exports.musicsPostService = exports.listAllMusicsByGenrerService = exports.registerAdminService = exports.listUniqueGenreService = exports.reactiveUserService = exports.genrePostService = exports.listUserService = exports.patchUserService = exports.deleteUserService = exports.loginService = exports.listAllPerformersService = exports.listAllUsersService = exports.registerUserService = void 0;
const deleteUsers_service_1 = __importDefault(require("./users/deleteUsers.service"));
exports.deleteUserService = deleteUsers_service_1.default;
const registerUsers_service_1 = __importDefault(require("./users/registerUsers.service"));
exports.registerUserService = registerUsers_service_1.default;
const listAllUsers_service_1 = __importDefault(require("./users/listAllUsers.service"));
exports.listAllUsersService = listAllUsers_service_1.default;
const listAllPerformers_service_1 = __importDefault(require("./users/listAllPerformers.service"));
exports.listAllPerformersService = listAllPerformers_service_1.default;
const login_service_1 = __importDefault(require("./login/login.service"));
exports.loginService = login_service_1.default;
const patchUsers_service_1 = __importDefault(require("./users/patchUsers.service"));
exports.patchUserService = patchUsers_service_1.default;
const listUser_service_1 = __importDefault(require("./users/listUser.service"));
exports.listUserService = listUser_service_1.default;
const genresPost_service_1 = __importDefault(require("./genres/genresPost.service"));
exports.genrePostService = genresPost_service_1.default;
const reactivateUsers_service_1 = __importDefault(require("./users/reactivateUsers.service"));
exports.reactiveUserService = reactivateUsers_service_1.default;
const listUniqueGenre_service_1 = __importDefault(require("./genres/listUniqueGenre.service"));
exports.listUniqueGenreService = listUniqueGenre_service_1.default;
const registerAdmin_service_1 = __importDefault(require("./admin/registerAdmin.service"));
exports.registerAdminService = registerAdmin_service_1.default;
const listAllMusicsByGenrer_service_1 = __importDefault(require("./musics/listAllMusicsByGenrer.service"));
exports.listAllMusicsByGenrerService = listAllMusicsByGenrer_service_1.default;
const listAllMusics_service_1 = __importDefault(require("./musics/listAllMusics.service"));
exports.listAllMusicsService = listAllMusics_service_1.default;
const listUniqueMusic_service_1 = __importDefault(require("./musics/listUniqueMusic.service"));
exports.listUniqueMusicService = listUniqueMusic_service_1.default;
const musicsPost_service_1 = __importDefault(require("./musics/musicsPost.service"));
exports.musicsPostService = musicsPost_service_1.default;
const deleteMusic_service_1 = __importDefault(require("./musics/deleteMusic.service"));
exports.deleteMusicService = deleteMusic_service_1.default;
const listAllMusicsByPerformer_service_1 = __importDefault(require("./musics/listAllMusicsByPerformer.service"));
exports.listAllMusicsByPerformerService = listAllMusicsByPerformer_service_1.default;
const registerAlbums_service_1 = __importDefault(require("./albums/registerAlbums.service"));
exports.registerAlbumService = registerAlbums_service_1.default;
const patchMusic_service_1 = __importDefault(require("./musics/patchMusic.service"));
exports.patchMusicService = patchMusic_service_1.default;
const listAlbum_service_1 = __importDefault(require("./albums/listAlbum.service"));
exports.listAlbumService = listAlbum_service_1.default;
const listAllAlbums_service_1 = __importDefault(require("./albums/listAllAlbums.service"));
exports.listAllAlbumsService = listAllAlbums_service_1.default;
const addMusicsToAlbums_service_1 = __importDefault(require("./albums/addMusicsToAlbums.service"));
exports.addMusicsToAlbumService = addMusicsToAlbums_service_1.default;
const patchAlbums_service_1 = __importDefault(require("./albums/patchAlbums.service"));
exports.patchAlbumService = patchAlbums_service_1.default;
const removeMusicsToAlbum_service_1 = __importDefault(require("./albums/removeMusicsToAlbum.service"));
exports.removeMusicFromAlbumService = removeMusicsToAlbum_service_1.default;
const deleteAlbum_service_1 = __importDefault(require("./albums/deleteAlbum.service"));
exports.deleteAlbumService = deleteAlbum_service_1.default;
const listAllAlbumsByPerformer_service_1 = __importDefault(require("./albums/listAllAlbumsByPerformer.service"));
exports.listAllAlbumsByPerformerService = listAllAlbumsByPerformer_service_1.default;
const registerPlaylists_service_1 = __importDefault(require("./playlists/registerPlaylists.service"));
exports.registerPlaylistsService = registerPlaylists_service_1.default;
const listAllPlaylists_service_1 = __importDefault(require("./playlists/listAllPlaylists.service"));
exports.listAllPlaylistsService = listAllPlaylists_service_1.default;
const listUniquePlaylist_service_1 = __importDefault(require("./playlists/listUniquePlaylist.service"));
exports.listUniquePlaylistService = listUniquePlaylist_service_1.default;
const listUserPlaylist_service_1 = __importDefault(require("./playlists/listUserPlaylist.service"));
exports.listUserPlaylistService = listUserPlaylist_service_1.default;
const patchPlaylists_service_1 = __importDefault(require("./playlists/patchPlaylists.service"));
exports.patchPlaylistsService = patchPlaylists_service_1.default;
const deletePlaylist_service_1 = __importDefault(require("./playlists/deletePlaylist.service"));
exports.deletePLaylistService = deletePlaylist_service_1.default;
const addMusicsToPlaylist_service_1 = __importDefault(require("./playlists/addMusicsToPlaylist.service"));
exports.addMusicsToPlaylistService = addMusicsToPlaylist_service_1.default;
const removeMusicsFromPlaylist_service_1 = __importDefault(require("./playlists/removeMusicsFromPlaylist.service"));
exports.removeMusicsFromPlaylistsService = removeMusicsFromPlaylist_service_1.default;
