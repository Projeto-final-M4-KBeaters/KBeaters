import { Genres } from "../../entities/genres.entities"
import { Users } from "../../entities/users.entities"

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
    performer: IPerformer
    genre: IGenre
    feats: IPerformer[]
    
}
interface IPerformer {
    id: string
    name: string
}

interface IGenre{
    id: string
    name: string
}

interface IListMusicsByPerformer {
    id: string
}

interface IMusicPatchRequest{
    id?:string
    name?: string
    duration?: string
    genreId?: string
    performerId?: string
    featsId?: string[]
}

interface IMusicPatchResponse{
    name: string
    duration: string
    createdAt: Date
    updatedAt: Date
    performer: IPerformer
    genre: IGenre
}



export {
    IMusicRequest,
    IMusicResponse,
    IListMusicsByPerformer,
    IPerformer,
    IMusicPatchRequest,
    IMusicPatchResponse

}