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
const bcryptjs_1 = require("bcryptjs");
const typeorm_1 = require("typeorm");
const data_source_1 = __importDefault(require("../../data-source"));
const users_entities_1 = require("../../entities/users.entities");
const errors_1 = require("../../errors");
const users_1 = require("../../serializers/users");
const reactiveUserService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.default.getRepository(users_entities_1.Users);
    const findUser = yield userRepository.findOne({
        withDeleted: true,
        where: {
            email: (0, typeorm_1.ILike)(`${userData.email}`),
        }
    });
    if (!findUser) {
        throw new errors_1.AppError("User not exists", 404);
    }
    if (findUser.isActive) {
        throw new errors_1.AppError("User already active", 409);
    }
    const passwordMatch = yield (0, bcryptjs_1.compare)(userData.password, findUser.password);
    if (!passwordMatch) {
        throw new errors_1.AppError("Email or password invalid", 403);
    }
    findUser.isActive = true;
    yield userRepository.save(findUser);
    const returnedData = yield users_1.userRegisterResponseSerializer.validate(findUser, {
        stripUnknown: true,
    });
    return returnedData;
});
exports.default = reactiveUserService;
