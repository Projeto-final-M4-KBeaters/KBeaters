import * as yup from "yup";
import { SchemaOf } from "yup";
import { IAlbumRequest, IAlbumResponse, IlistAllAlbumsByPerformerResponse } from "../../interfaces/albums";

const albumPostSerializer: SchemaOf<IAlbumRequest> = yup.object().shape({
    name: yup.string().required()
})

const resgisterAlbumResponse: SchemaOf<IAlbumResponse> = yup.object()
    .shape({
        id: yup.string().required(),
        name: yup.string().required(),
        duration: yup.string().required(),
        performer: yup.object({
            id: yup.string().required(),
            name: yup.string().required()
        }).required(),
        createdAt: yup.date().required()

    })

const listAlbumResponseSerializer: SchemaOf<IAlbumResponse> = yup.object()
    .shape({
        id: yup.string().required(),
        name: yup.string().required(),
        duration: yup.string().required(),
        createdAt: yup.date().required(),
        musics: yup.array().of(
            yup.object({
                id: yup.string().required(),
                name: yup.string().required(),
                duration: yup.string().required()
            }).notRequired()
        ).required(),
        performer: yup.object({
            id: yup.string().required(),
            name: yup.string().required()
        }).required()
    })

const listAllAlbumsByPerformerSerializer: SchemaOf<IlistAllAlbumsByPerformerResponse> = yup.object()
    .shape({
        id: yup.string().required(),
        name: yup.string().required(),
        albums: yup.array().of(
            yup.object({
                id: yup.string().required(),
                name: yup.string().required(),
                duration: yup.string().required(),
                createdAt: yup.date().required(),
                musics: yup.array()
            }).required()
        ).notRequired()
    })

const listAlbumResponseArray: SchemaOf<IAlbumResponse[]> = yup.array(
    listAlbumResponseSerializer
)

const listAllAlbumsByPerformerSerializerResponse : SchemaOf<IlistAllAlbumsByPerformerResponse[]> = yup.array(
    listAllAlbumsByPerformerSerializer
)

export { albumPostSerializer, resgisterAlbumResponse,listAllAlbumsByPerformerSerializerResponse, listAlbumResponseArray,listAllAlbumsByPerformerSerializer, listAlbumResponseSerializer }
