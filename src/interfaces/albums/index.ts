import { IMusicByAlbumResponse, IPerformer } from "../musics"

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

interface IListMusicByAlbumResponse{
    id: string,
    name: string,
    duration: string,
    createdAt: Date,
    musics: IMusicByAlbumResponse[],
    performer: IPerformer
}

export { IAlbumRequest, IAlbumResponse, IListMusicByAlbumResponse }