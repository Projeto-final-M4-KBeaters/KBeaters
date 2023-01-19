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
const albuns_entities_1 = require("../../entities/albuns.entities");
const musics_entities_1 = require("../../entities/musics.entities");
const errors_1 = require("../../errors");
const albums_1 = require("../../serializers/albums");
const addMusicsToAlbumService = (albumID, musicID) => __awaiter(void 0, void 0, void 0, function* () {
    const albumRepository = data_source_1.default.getRepository(albuns_entities_1.Albums);
    const musicRepository = data_source_1.default.getRepository(musics_entities_1.Musics);
    const findMusic = yield musicRepository.findOne({
        where: {
            id: musicID
        },
    });
    const findAlbum = yield albumRepository.findOne({
        where: {
            id: albumID
        },
        relations: {
            musics: true,
            performer: true
        },
        order: {
            musics: {
                isActive: 'desc'
            }
        }
    });
    if (findAlbum.musics.find(music => music.id === (findMusic === null || findMusic === void 0 ? void 0 : findMusic.id))) {
        throw new errors_1.AppError("Music Already Exists In Album", 409);
    }
    const sumTime = findMusic.duration.split(":");
    const time = findMusic.duration.split(":");
    const dateTime = new Date();
    dateTime.setHours(Number(sumTime[0]) + Number(time[0]), Number(sumTime[1]) + Number(time[1]), Number(sumTime[2]) + Number(time[2]));
    const hours = dateTime.getHours() > 9 ? dateTime.getHours() : "0" + dateTime.getHours();
    const minutes = dateTime.getMinutes() > 9 ? dateTime.getMinutes() : "0" + dateTime.getMinutes();
    const seconds = dateTime.getSeconds() > 9 ? dateTime.getSeconds() : "0" + dateTime.getSeconds();
    const durationStr = `${hours}:${minutes}:${seconds}`;
    findAlbum.duration = durationStr;
    findAlbum.musics = [...findAlbum.musics, findMusic];
    const musicSave = yield albumRepository.save(findAlbum);
    const response = yield albums_1.listAlbumResponseSerializer.validate(musicSave, { stripUnknown: true });
    return response;
});
exports.default = addMusicsToAlbumService;
