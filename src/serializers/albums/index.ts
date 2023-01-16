import * as yup from "yup";
import { SchemaOf } from "yup";
import { IAlbumRequest, IAlbumResponse, IListMusicByAlbumResponse } from "../../interfaces/albums";

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

const listMusicsByAlbumResponseSerializer: SchemaOf<IListMusicByAlbumResponse> = yup.object()
const listResponseSerializer: SchemaOf<IAlbumResponse> = yup.object()
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
        }).required()
    ).required(),
    performer: yup.object({
        id: yup.string().required(),
        name: yup.string().required()
    }).required()
})

const listAlbumResponseArray: SchemaOf<IAlbumResponse[]> = yup.array(
    listResponseSerializer
)

export {albumPostSerializer, resgisterAlbumResponse,listAlbumResponseArray, listMusicsByAlbumResponseSerializer}