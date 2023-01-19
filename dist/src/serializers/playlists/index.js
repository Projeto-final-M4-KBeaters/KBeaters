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
exports.playlistAddMusicSerializer = exports.listAllPlaylistsByUser = exports.listAllPlaylistsSerializer = exports.listPlaylistsResponseArray = exports.resgisterPlaylistResponse = exports.playlistPostSerializer = void 0;
const yup = __importStar(require("yup"));
const playlistPostSerializer = yup.object().shape({
    name: yup.string().required()
});
exports.playlistPostSerializer = playlistPostSerializer;
const playlistAddMusicSerializer = yup.object().shape({
    id: yup.string().required()
});
exports.playlistAddMusicSerializer = playlistAddMusicSerializer;
const resgisterPlaylistResponse = yup.object().shape({
    musics: yup.array().of(yup.object({
        id: yup.string().required(),
        name: yup.string().required()
    }).notRequired()).notRequired(),
    updatedAt: yup.date().required(),
    createdAt: yup.date().required(),
    user: yup.object({
        id: yup.string().required(),
        name: yup.string().required()
    }).required(),
    isActive: yup.boolean().required(),
    duration: yup.string().required(),
    name: yup.string().required(),
    id: yup.string().required(),
});
exports.resgisterPlaylistResponse = resgisterPlaylistResponse;
const listAllPlaylistsSerializer = yup.object().shape({
    musics: yup.array().of(yup.object({
        id: yup.string().required(),
        name: yup.string().required()
    }).notRequired()).notRequired(),
    user: yup.object({
        id: yup.string().required(),
        name: yup.string().required()
    }).required(),
    updatedAt: yup.date().required(),
    createdAt: yup.date().required(),
    duration: yup.string().required(),
    isActive: yup.boolean().required(),
    name: yup.string().required(),
    id: yup.string().required(),
});
exports.listAllPlaylistsSerializer = listAllPlaylistsSerializer;
const listPlaylistsResponseArray = yup.array(listAllPlaylistsSerializer);
exports.listPlaylistsResponseArray = listPlaylistsResponseArray;
const listAllPlaylistsByUser = yup.object().shape({
    playlists: yup.array().of(yup.object({
        musics: yup.array().of(yup.object({
            duration: yup.string().required(),
            name: yup.string().required(),
            id: yup.string().required()
        })),
        updatedAt: yup.string().required(),
        createdAt: yup.string().required(),
        duration: yup.string().required(),
        name: yup.string().required(),
        id: yup.string().required()
    })).notRequired(),
    name: yup.string().required(),
    id: yup.string().required()
});
exports.listAllPlaylistsByUser = listAllPlaylistsByUser;
