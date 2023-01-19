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
const data_source_1 = __importDefault(require("../../data-source"));
const users_entities_1 = require("../../entities/users.entities");
const errors_1 = require("../../errors");
const users_1 = require("../../serializers/users");
const registerUserService = (usersData) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.default.getRepository(users_entities_1.Users);
    const userExist = yield userRepository.findOne({
        where: { email: (0, typeorm_1.ILike)(`${usersData.email}`) },
    });
    if (userExist) {
        if (!userExist.isActive) {
            throw new errors_1.AppError("User disabled", 409);
        }
        throw new errors_1.AppError("Already exists", 409);
    }
    const createdUser = userRepository.create(usersData);
    yield userRepository.save(createdUser);
    const returnedData = yield users_1.userRegisterResponseSerializer.validate(createdUser, {
        stripUnknown: true,
    });
    return returnedData;
});
exports.default = registerUserService;
