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
const uuid_1 = require("uuid");
const errors_1 = require("../../errors");
const listUniqueGenreService = (paramsData) => __awaiter(void 0, void 0, void 0, function* () {
    const genreRepo = data_source_1.default.getRepository(genres_entities_1.Genres);
    if ((0, uuid_1.validate)(paramsData)) {
        const genre = yield genreRepo.findOneBy({ id: paramsData });
        if (!genre) {
            throw new errors_1.AppError("Genre not found", 404);
        }
        return genre;
    }
    const genre = yield genreRepo.findOneBy({ name: paramsData });
    if (!genre) {
        throw new errors_1.AppError("Genre not found", 404);
    }
    return genre;
});
exports.default = listUniqueGenreService;
