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
const data_source_1 = __importDefault(require("../../data-source"));
const users_entities_1 = require("../../entities/users.entities");
const users_1 = require("../../serializers/users");
const patchUserService = (userDataUpdated, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const userPatch = userDataUpdated;
    if (userPatch.password) {
        userPatch.password = (0, bcryptjs_1.hashSync)(userPatch.password, 10);
    }
    const userRepo = data_source_1.default.getRepository(users_entities_1.Users);
    const newUser = userRepo.create(Object.assign(Object.assign({}, userData), userPatch));
    const user = yield userRepo.save(newUser);
    const returnedData = yield users_1.userRegisterResponseSerializer.validate(user, {
        stripUnknown: true
    });
    return returnedData;
});
exports.default = patchUserService;
