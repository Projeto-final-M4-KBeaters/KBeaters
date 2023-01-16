import { IMusicByAlbumResponse, IPerformer, IMusicResponse } from "../musics"
import { Musics } from "../../entities/musics.entities"

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

interface IListMusicByAlbumResponse{
    id: string,
    name: string,
    duration: string,
    createdAt: Date,
    musics: IMusicByAlbumResponse[],
    performer: IPerformer
}

interface IlistAlbumResponse{
    id:string,
    name:string,
    duration:string,
    performer: IPerformer
    musics: Musics[]
    createdAt:Date
}


export { IAlbumRequest, IAlbumResponse, IlistAlbumResponse, IListMusicByAlbumResponse }
