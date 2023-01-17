import { IPerformer } from "../musics"
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

export { IPlaylistRequest, IPlaylistResponse, IUser }