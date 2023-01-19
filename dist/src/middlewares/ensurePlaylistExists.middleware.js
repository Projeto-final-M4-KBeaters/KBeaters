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
const data_source_1 = __importDefault(require("../data-source"));
const playlists_entities_1 = require("../entities/playlists.entities");
const errors_1 = require("../errors");
const ensurePlaylistExistsMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const playlistRepo = data_source_1.default.getRepository(playlists_entities_1.Playlists);
    const playlist = yield playlistRepo.findOne({
        where: {
            id: req.params.id
        },
        relations: {
            user: true,
            musics: true
        }
    });
    if (!playlist || !playlist.isActive) {
        throw new errors_1.AppError("Playlist not exists", 404);
    }
    req.providedPlaylist = playlist;
    return next();
});
exports.default = ensurePlaylistExistsMiddleware;
