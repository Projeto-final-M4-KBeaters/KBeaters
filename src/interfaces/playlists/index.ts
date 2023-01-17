import { IMusic, IMusicByAlbumResponse, IPerformer } from "../musics"
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

interface ISpecificUserPlaylistResponse{
    id: string
    name: string
    duration: string
    createdAt: string
    updatedAt: string
    musics: IMusicByAlbumResponse[]
}

interface IPlaylistsUserResponse{
    id: string,
    name: string,
    playlists: ISpecificUserPlaylistResponse[]
}

export { IPlaylistRequest, IPlaylistResponse, IUser, IPlaylistsResponse, IPlaylistsUserResponse }