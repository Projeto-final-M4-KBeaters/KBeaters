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
const musics_1 = require("../../serializers/musics");
const patchMusicService = (musicDataUpdated, musicData, musicId) => __awaiter(void 0, void 0, void 0, function* () {
    const musicsRepo = data_source_1.default.getRepository(musics_entities_1.Musics);
    const newMusic = musicsRepo.create(Object.assign(Object.assign({}, musicData), musicDataUpdated));
    const music = yield musicsRepo.save(newMusic);
    const findMusic = yield musicsRepo.createQueryBuilder("musics")
        .innerJoinAndSelect("musics.genre", "genres")
        .innerJoinAndSelect("musics.performer", "performer")
        .where("musics.id = :id_musics", { id_musics: musicId })
        .getOne();
    musicData.updatedAt = new Date;
    const returnedData = yield musics_1.musicPatchSerializer.validate(findMusic, {
        stripUnknown: true
    });
    return returnedData;
});
exports.default = patchMusicService;
