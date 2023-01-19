"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.performerMusicsResponseSerializer = exports.loginSerializer = exports.userPatchRequestSerializer = exports.listUsersResponseSerializer = exports.userRegisterResponseSerializer = exports.userSerializer = void 0;
const yup = __importStar(require("yup"));
const userSerializer = yup.object().shape({
    email: yup.string().email().required(),
    name: yup.string().required(),
    password: yup.string().required(),
    isPerformer: yup.boolean().required(),
});
exports.userSerializer = userSerializer;
const userRegisterResponseSerializer = yup
    .object()
    .shape({
    updatedAt: yup.date().required(),
    createdAt: yup.date().required(),
    isAdmin: yup.boolean().required(),
    isActive: yup.boolean().required(),
    isPerformer: yup.boolean().required(),
    email: yup.string().email().required(),
    name: yup.string().required(),
    id: yup.string().required(),
});
exports.userRegisterResponseSerializer = userRegisterResponseSerializer;
const listUsersResponseSerializer = yup.array(userRegisterResponseSerializer);
exports.listUsersResponseSerializer = listUsersResponseSerializer;
const userPatchRequestSerializer = yup.object().shape({
    name: yup.string().notRequired(),
    email: yup.string().notRequired(),
    password: yup.string().notRequired(),
    isPerformer: yup.boolean().notRequired()
});
exports.userPatchRequestSerializer = userPatchRequestSerializer;
const loginSerializer = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required()
});
exports.loginSerializer = loginSerializer;
const performerMusicsResponseSerializer = yup.object().shape({
    musics: yup.array().of(yup.object({
        id: yup.string().notRequired(),
        name: yup.string().notRequired(),
        duration: yup.string().notRequired(),
    })).notRequired(),
    updatedAt: yup.date().required(),
    createdAt: yup.date().required(),
    isActive: yup.boolean().required(),
    name: yup.string().required(),
    id: yup.string().required(),
});
exports.performerMusicsResponseSerializer = performerMusicsResponseSerializer;
