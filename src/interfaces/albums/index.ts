import { IPerformer } from "../musics"

interface IAlbumRequest{
    name: string
}

interface IAlbumResponse{
    id: string
    name: string,
    duration: string,
    performer: IPerformer,
    createdAt: Date
}


export { IAlbumRequest, IAlbumResponse }