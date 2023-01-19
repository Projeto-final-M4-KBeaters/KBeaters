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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const errors_1 = require("../errors");
const data_source_1 = __importDefault(require("../data-source"));
const users_entities_1 = require("../entities/users.entities");
const users_1 = require("../serializers/users");
const ensureAuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.headers.authorization;
    if (!token) {
        throw new errors_1.AppError("Invalid token", 401);
    }
    token = token.split(" ")[1];
    jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (error, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (error) {
            return res.status(401).json({ message: "Invalid token" });
        }
        const userRepo = data_source_1.default.getRepository(users_entities_1.Users);
        const user = yield userRepo.findOne({ where: { id: decoded.sub } });
        if (!user) {
            return res.status(401).json({ message: "Invalid token" });
        }
        const userFiltered = yield users_1.userRegisterResponseSerializer.validate(user, {
            stripUnknown: true
        });
        req.user = userFiltered;
        return next();
    }));
});
exports.default = ensureAuthMiddleware;
