import { IPerformer } from "../musics"
import { IMusicResponse } from "../musics"

interface IAlbumRequest{
    name: string
}

interface IAlbumResponse{
    id: string,
    name: string,
    duration: string,
    performer: IPerformer,
    createdAt: Date
}

interface IlistAlbumResponse{
    id:string,
    name:string,
    duration:string,
    performer: IPerformer
    musics: IMusicResponse[]
    createdAt:Date
}


export { IAlbumRequest, IAlbumResponse,IlistAlbumResponse }