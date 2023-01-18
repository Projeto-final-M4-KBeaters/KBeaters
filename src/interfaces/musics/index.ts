import { Genres } from "../../entities/genres.entities"
import { Users } from "../../entities/users.entities"
import { IGenreResponse } from "../genres"
import { IUserResponseSimplified } from "../users"

interface IMusicRequest {
    name: string
    duration: string
    genreId: string
    featsId: string[]
}

interface IMusicResponse {
    name: string
    duration: string
    createdAt: Date
    updatedAt: Date
    performer: IUserResponseSimplified
    genre: IGenreResponse
    feats: IUserResponseSimplified[]
}

interface IMusicPatchRequest{
    name?: string
    genreId?: string
}

interface IMusicPatchResponse{
    name: string
    duration: string
    createdAt: Date
    updatedAt: Date
    performer: IUserResponseSimplified
    genre: IGenreResponse
}

interface IMusicByAlbumOrPlaylistResponse {
    id: string
    name: string
    duration: string
}

interface IMusicResponseSimples{
    id: string
    name: string
}

export {
    IMusicRequest,
    IMusicResponse,
    IMusicPatchRequest,
    IMusicByAlbumOrPlaylistResponse,
    IMusicPatchResponse,
    IMusicResponseSimples
}