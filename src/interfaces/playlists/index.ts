import { IMusic, IPerformer } from "../musics"
import { IUserResponse } from "../users"

interface IUser {
    id: string,
    name: string
}

interface IPlaylistRequest {
    name: string
}

interface IPlaylistResponse{
    id: string,
    name: string,
    duration: string,
    user: IUser,
    createdAt: Date,
    updatedAt: Date
}

interface IPlaylistsResponse{
    id: string,
    name: string,
    duration: string,
    createdAt: Date,
    user: IUser,
    musics: IMusic[]
    updatedAt: Date
}

export { IPlaylistRequest, IPlaylistResponse, IUser, IPlaylistsResponse }