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
const albums_1 = require("../../serializers/albums");
const listAllAlbumsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const albumRepository = data_source_1.default.getRepository(albuns_entities_1.Albums);
    const listAlbums = yield albumRepository.find({
        relations: {
            musics: true,
            performer: true
        },
        order: {
            isActive: 'desc'
        }
    });
    const returnedData = yield albums_1.listAlbumResponseArray.validate(listAlbums, {
        stripUnknown: true
    });
    return returnedData;
});
exports.default = listAllAlbumsService;
