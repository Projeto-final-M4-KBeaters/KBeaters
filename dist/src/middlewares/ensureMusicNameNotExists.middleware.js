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
const typeorm_1 = require("typeorm");
const data_source_1 = __importDefault(require("../data-source"));
const musics_entities_1 = require("../entities/musics.entities");
const errors_1 = require("../errors");
const ensureMusicNameNotExistsMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const musicsRepo = data_source_1.default.getRepository(musics_entities_1.Musics);
    const findMusic = yield musicsRepo.findOne({
        relations: {
            performer: true
        },
        where: {
            name: (0, typeorm_1.ILike)(`${req.body.name}`),
            performer: {
                name: req.user.name
            }
        },
    });
    if (findMusic) {
        throw new errors_1.AppError("Music already exists", 401);
    }
    return next();
});
exports.default = ensureMusicNameNotExistsMiddleware;
