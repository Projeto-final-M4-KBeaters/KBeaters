import * as yup from "yup";
import { SchemaOf } from "yup";
import { IPlaylistRequest, IPlaylistResponse, IPlaylistsResponse } from "../../interfaces/playlists";

const playlistPostSerializer: SchemaOf<IPlaylistRequest> = yup.object().shape({
    name: yup.string().required()
})


const resgisterPlaylistResponse: SchemaOf<IPlaylistResponse> = yup.object().shape({
    id: yup.string().required(),
    name: yup.string().required(),
    duration: yup.string().required(),
    user: yup.object({
        id: yup.string().required(),
        name: yup.string().required()
    }).required(),
    createdAt: yup.date().required(),
    updatedAt: yup.date().required()

})

const listAllPlaylistsSerializer: SchemaOf<IPlaylistsResponse> = yup.object().shape({
    id: yup.string().required(),
    name: yup.string().required(),
    duration: yup.string().required(),
    createdAt: yup.date().required(),
    user: yup.object({
        id: yup.string().required(),
        name: yup.string().required()
    }).required(),
    musics: yup.array().of(
        yup.object({
            id: yup.string().required(),
            name: yup.string().required()
        })
    ),
    updatedAt: yup.date().required()
})

const listPlaylistsResponseArray: SchemaOf<IPlaylistsResponse[]> = yup.array(
    listAllPlaylistsSerializer
)

export { playlistPostSerializer, resgisterPlaylistResponse, listPlaylistsResponseArray }