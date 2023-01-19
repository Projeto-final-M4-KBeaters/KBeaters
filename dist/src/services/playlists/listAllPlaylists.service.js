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
const playlists_entities_1 = require("../../entities/playlists.entities");
const playlists_1 = require("../../serializers/playlists");
const listAllPlaylistsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const playlistRepository = data_source_1.default.getRepository(playlists_entities_1.Playlists);
    const listPlaylists = yield playlistRepository.find({
        relations: {
            musics: true,
            user: true
        }
    });
    const playlists = yield playlists_1.listPlaylistsResponseArray.validate(listPlaylists, {
        stripUnknown: true
    });
    return playlists;
});
exports.default = listAllPlaylistsService;
