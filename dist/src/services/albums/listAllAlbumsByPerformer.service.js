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
const users_entities_1 = require("../../entities/users.entities");
const albums_1 = require("../../serializers/albums");
const listAllAlbumsByPerformerService = (performerId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = data_source_1.default.getRepository(users_entities_1.Users);
    const findAlbums = yield user.findOne({
        where: {
            id: performerId
        },
        relations: {
            albums: {
                musics: true
            }
        }
    });
    const responseAlbumsFound = yield albums_1.listAllAlbumsByPerformerSerializer.validate(findAlbums, {
        stripUnknown: true
    });
    return responseAlbumsFound;
});
exports.default = listAllAlbumsByPerformerService;
