import * as yup from "yup";
import { SchemaOf } from "yup";
import { IPlaylistAddOrRemoveMusicRequest, IPlaylistRequest, IPlaylistsResponse, IPlaylistsUserResponse } from "../../interfaces/playlists";

const playlistPostSerializer: SchemaOf<IPlaylistRequest> = yup.object().shape({
    name: yup.string().required()
})

const playlistAddMusicSerializer: SchemaOf<IPlaylistAddOrRemoveMusicRequest> = yup.object().shape({
    id: yup.string().required()
})

const resgisterPlaylistResponse: SchemaOf<IPlaylistsResponse> = yup.object().shape({
    id: yup.string().required(),
    name: yup.string().required(),
    duration: yup.string().required(),
    user: yup.object({
        id: yup.string().required(),
        name: yup.string().required()
    }).required(),
    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
    musics: yup.array().of(
        yup.object({
            id: yup.string().required(),
            name: yup.string().required()
        }).notRequired()
    ).notRequired(),

})

const listAllPlaylistsSerializer: SchemaOf<IPlaylistsResponse> = yup.object().shape({
    updatedAt: yup.date().required(),
    musics: yup.array().of(
        yup.object({
            id: yup.string().required(),
            name: yup.string().required()
        }).notRequired()
    ).notRequired(),
    user: yup.object({
        id: yup.string().required(),
        name: yup.string().required()
    }).required(),
    createdAt: yup.date().required(),
    duration: yup.string().required(),
    name: yup.string().required(),
    id: yup.string().required(),
})

const listPlaylistsResponseArray: SchemaOf<IPlaylistsResponse[]> = yup.array(
    listAllPlaylistsSerializer
)

const listAllPlaylistsByUser: SchemaOf<IPlaylistsUserResponse> = yup.object().shape({
    playlists: yup.array().of(
        yup.object({
            musics: yup.array().of(
                yup.object({
                    duration: yup.string().required(),
                    name: yup.string().required(),
                    id: yup.string().required()
                })
            ),
            updatedAt: yup.string().required(),
            createdAt: yup.string().required(),
            duration: yup.string().required(),
            name: yup.string().required(),
            id: yup.string().required()
        })
    ).required(),
    name: yup.string().required(),
    id: yup.string().required()
})

export { playlistPostSerializer, resgisterPlaylistResponse, listPlaylistsResponseArray, listAllPlaylistsSerializer, listAllPlaylistsByUser, playlistAddMusicSerializer }

