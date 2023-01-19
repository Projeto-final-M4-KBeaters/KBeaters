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
const errors_1 = require("../errors");
const data_source_1 = __importDefault(require("../data-source"));
const musics_entities_1 = require("../entities/musics.entities");
const ensureAuthIsAdmOrOwnerProvidedMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const musicRepository = data_source_1.default.getRepository(musics_entities_1.Musics);
    const musics = yield musicRepository.createQueryBuilder("musics")
        .innerJoinAndSelect("musics.performer", "users")
        .where("users.id = :id_owner", { id_owner: req.user.id })
        .andWhere("musics.id = :id_music", { id_music: req.body.id })
        .getOne();
    if (!musics) {
        throw new errors_1.AppError("You don't own such music.", 403);
    }
    if (!musics.isActive) {
        throw new errors_1.AppError("music has already been deleted", 403);
    }
    if (req.user.isAdmin || req.user.id === musics.performer.id) {
        return next();
    }
    throw new errors_1.AppError("Not permission", 403);
});
exports.default = ensureAuthIsAdmOrOwnerProvidedMiddleware;
