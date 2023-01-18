import * as yup from "yup";
import { SchemaOf } from "yup";
import { IMusicPatchRequest, IMusicPatchResponse, IMusicRequest, IMusicResponse } from "../../interfaces/musics";
import { IUserRequest } from "../../interfaces/users";

const musicsRequestSerializer: SchemaOf<IMusicRequest> = yup.object().shape({
    name: yup.string().required(),
    duration: yup.string().required(),
    genreId: yup.string().required(),
    featsId: yup.array().notRequired()
})

const musicsResponseSerializer: SchemaOf<IMusicResponse> = yup.object().shape({
    id: yup.string().required(),
    name: yup.string().required(),
    duration: yup.string().required(),
    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
    performer: yup.object({
        id: yup.string().required(),
        name: yup.string().required()
    }).required(),
    feats: yup.array().of(
        yup.object({
            id: yup.string().required(),
            name: yup.string().required(),
        }).notRequired()
    ).required(),
    genre: yup.object({
        id: yup.string().required(),
        name: yup.string().required()
    }).required()
})

const musicPatchSerializer: SchemaOf<IMusicPatchResponse> = yup.object().shape({
    name: yup.string().required(),
    duration: yup.string().required(),
    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
    performer: yup.object({
        id: yup.string().required(),
        name: yup.string().required()
    }).required(),
    genre: yup.object({
        id: yup.string().required(),
        name: yup.string().required()
    }).required()
})

const musicPatchRequestSerializer: SchemaOf<IMusicPatchRequest> = yup.object().shape({
    id:yup.string().notRequired(),
    name: yup.string().notRequired(),
    duration: yup.string().notRequired(),
    performerId: yup.string().notRequired(),
    genreId: yup.string().notRequired(),
    featsId: yup.array().notRequired()
})

export {
    musicsResponseSerializer,
    musicsRequestSerializer,
    musicPatchSerializer,
    musicPatchRequestSerializer
}