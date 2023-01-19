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
exports.listMusicsResponseArray = exports.musicPatchRequestSerializer = exports.musicPatchSerializer = exports.musicsRequestSerializer = exports.musicsResponseSerializer = void 0;
const yup = __importStar(require("yup"));
const musicsRequestSerializer = yup.object().shape({
    name: yup.string().required(),
    duration: yup.string().required(),
    genreId: yup.string().required(),
    featsId: yup.array().notRequired()
});
exports.musicsRequestSerializer = musicsRequestSerializer;
const musicsResponseSerializer = yup.object().shape({
    genre: yup.object({
        id: yup.string().required(),
        name: yup.string().required()
    }).required(),
    feats: yup.array().of(yup.object({
        id: yup.string().required(),
        name: yup.string().required(),
    }).notRequired()).notRequired(),
    performer: yup.object({
        id: yup.string().required(),
        name: yup.string().required()
    }).required(),
    updatedAt: yup.date().required(),
    createdAt: yup.date().required(),
    isActive: yup.boolean().required(),
    duration: yup.string().required(),
    name: yup.string().required(),
    id: yup.string().required(),
});
exports.musicsResponseSerializer = musicsResponseSerializer;
const listMusicsResponseArray = yup.array(musicsResponseSerializer);
exports.listMusicsResponseArray = listMusicsResponseArray;
const musicPatchSerializer = yup.object().shape({
    genre: yup.object({
        id: yup.string().required(),
        name: yup.string().required()
    }).required(),
    performer: yup.object({
        id: yup.string().required(),
        name: yup.string().required()
    }).required(),
    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
    isActive: yup.boolean().required(),
    duration: yup.string().required(),
    name: yup.string().required(),
    id: yup.string().required()
});
exports.musicPatchSerializer = musicPatchSerializer;
const musicPatchRequestSerializer = yup.object().shape({
    id: yup.string().notRequired(),
    name: yup.string().notRequired(),
    duration: yup.string().notRequired(),
    performerId: yup.string().notRequired(),
    genreId: yup.string().notRequired(),
    featsId: yup.array().notRequired()
});
exports.musicPatchRequestSerializer = musicPatchRequestSerializer;
