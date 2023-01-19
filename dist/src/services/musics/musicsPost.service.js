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
const genres_entities_1 = require("../../entities/genres.entities");
const musics_entities_1 = require("../../entities/musics.entities");
const users_entities_1 = require("../../entities/users.entities");
const errors_1 = require("../../errors");
const musics_1 = require("../../serializers/musics");
const musicsPostService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, duration, genreId, featsId } = req.body;
    const performer = req.user;
    const usersRepo = data_source_1.default.getRepository(users_entities_1.Users);
    const musicsRepo = data_source_1.default.getRepository(musics_entities_1.Musics);
    const genreRepo = data_source_1.default.getRepository(genres_entities_1.Genres);
    const feats = [];
    if (featsId) {
        const featsPromise = featsId.map((id) => __awaiter(void 0, void 0, void 0, function* () {
            const featUser = yield usersRepo.find({
                where: {
                    id: id,
                    isPerformer: true
                }
            });
            return featUser[0];
        }));
        yield Promise.all(featsPromise)
            .then(res => {
            res.forEach(item => {
                if (item)
                    feats.push(item);
            });
        });
    }
    const genre = yield genreRepo.findOne({
        where: {
            id: genreId
        }
    });
    if (!genre) {
        throw new errors_1.AppError("Genre not found.", 404);
    }
    const newMusic = {
        name,
        performer,
        duration,
        feats,
        genre
    };
    const music = musicsRepo.create(newMusic);
    const musicSave = yield musicsRepo.save(music);
    const response = yield musics_1.musicsResponseSerializer.validate(musicSave, {
        stripUnknown: true,
    });
    return response;
});
exports.default = musicsPostService;
