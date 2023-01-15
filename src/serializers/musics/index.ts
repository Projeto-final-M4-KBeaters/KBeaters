import * as yup from "yup";
import { SchemaOf } from "yup";
import { IMusicRequest, IMusicResponse } from "../../interfaces/musics";
import { IUserRequest } from "../../interfaces/users";

const musicsRequestSerializer: SchemaOf<IMusicRequest> = yup.object().shape({
    name: yup.string().required(),
    duration: yup.string().required(),
    genreId: yup.string().required(),
    featsId: yup.array().notRequired()
})

const musicsResponseSerializer: SchemaOf<IMusicResponse> = yup.object().shape({
    name: yup.string().required(),
    duration: yup.string().required(),
    createdAt: yup.string().required(),
    updatedAt: yup.string().required(),
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

export {
    musicsResponseSerializer,
    musicsRequestSerializer
}