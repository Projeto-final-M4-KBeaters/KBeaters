"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("../../data-source"));
const musics_entities_1 = require("../../entities/musics.entities");
const playlists_entities_1 = require("../../entities/playlists.entities");
const errors_1 = require("../../errors");
const playlists_1 = require("../../serializers/playlists");
const addMusicsToPlaylistService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const musicId = req.body.id;
    const userId = req.user.id;
    const playlist = req.providedPlaylist;
    const musicsRepo = data_source_1.default.getRepository(musics_entities_1.Musics);
    const playlistsRepo = data_source_1.default.getRepository(playlists_entities_1.Playlists);
    const findMusic = yield musicsRepo.findOne({
        where: {
            id: musicId,
            isActive: true
        }
    });
    const findMusicOnPlaylist = yield playlistsRepo.findOne({
        where: {
            isActive: true,
            id: playlist.id,
            musics: {
                id: musicId,
                isActive: true,
            }
        }
    });
    if (!findMusic) {
        throw new errors_1.AppError("Music not found.", 403);
    }
    if (findMusicOnPlaylist) {
        throw new errors_1.AppError("Music already added before", 409);
    }
    const sumTime = findMusic.duration.split(":");
    const time = playlist.duration.split(":");
    const dateTime = new Date();
    dateTime.setHours(Number(sumTime[0]) + Number(time[0]), Number(sumTime[1]) + Number(time[1]), Number(sumTime[2]) + Number(time[2]));
    const hours = dateTime.getHours() > 9 ? dateTime.getHours() : "0" + dateTime.getHours();
    const minutes = dateTime.getMinutes() > 9 ? dateTime.getMinutes() : "0" + dateTime.getMinutes();
    const seconds = dateTime.getSeconds() > 9 ? dateTime.getSeconds() : "0" + dateTime.getSeconds();
    const durationStr = `${hours}:${minutes}:${seconds}`;
    playlist.musics = [...playlist.musics, findMusic];
    playlist.duration = durationStr;
    yield playlistsRepo.save(playlist);
    const response = yield playlists_1.listAllPlaylistsSerializer.validate(playlist, {
        stripUnknown: true
    });
    return response;
});
exports.default = addMusicsToPlaylistService;
