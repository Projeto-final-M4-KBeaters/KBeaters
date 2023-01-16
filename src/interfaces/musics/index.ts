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
    createdAt: string
    updatedAt: string
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
export {
    IMusicRequest,
    IMusicResponse,
    IListMusicsByPerformer,
    IPerformer
}