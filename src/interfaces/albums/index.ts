import { IMusicByAlbumResponse, IPerformer, IMusicResponse } from "../musics"
import { Musics } from "../../entities/musics.entities"

interface IAlbumRequest{
    name: string
}

interface IAlbumResponse{
    id: string,
    name: string,
    duration?: string,
    createdAt: Date
}

// interface IListMusicByAlbumResponse{
//     id: string,
//     name: string,
//     duration: string,
//     createdAt: Date,
//     musics: IMusicByAlbumResponse[],
//     performer: IPerformer
// }

interface IlistAlbumResponse{
    id:string,
    name:string,
    duration:string,
    performer: IPerformer
    musics: IMusicByAlbumResponse[]
    createdAt:Date
}
interface teste{
    id:string | undefined,
    name:string | undefined,
    duration:string | undefined,
    musics: IMusicByAlbumResponse[] | undefined
    createdAt:Date | undefined
}
interface IlistAllAlbumsByPerformerResponse{
    id:string
    name:string 
    albums: []
}

export { IAlbumRequest, IAlbumResponse,teste, IlistAlbumResponse, IlistAllAlbumsByPerformerResponse}
