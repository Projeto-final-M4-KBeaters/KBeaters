import AppDataSource from "../../data-source"
import { Albums } from "../../entities/albuns.entities"
import { Musics } from "../../entities/musics.entities"
import { AppError } from "../../errors"
import { IAlbumRequest, IAlbumResponse,IlistAlbumResponse } from "../../interfaces/albums"


const addMusicsToAlbumService = async(albumID:string,musicID:string) => {

    const albumRepository = AppDataSource.getRepository(Albums)
    const musicRepository = AppDataSource.getRepository(Musics)
    
    const findMusic = await musicRepository.findOne({
        where:{
            id: musicID
        },
    })

    const findAlbum = await albumRepository.findOne({
        where: {
            id: albumID
        },
        relations: {
            musics:true
        }
    })
    
    
    const {id,name,duration,musics,performer,createdAt} = findAlbum as IlistAlbumResponse
    
    if(musics.find(music => music.id === findMusic?.id)){
        throw new AppError("Music Already In Album", 409)
    }
    
    
    const sumTime = findMusic!.duration.split(":") 
    const time = duration.split(":")
    const dateTime = new Date()
    dateTime.setMinutes(Number(time[1]) + Number(sumTime[1]))
    dateTime.setSeconds(Number(time[2]) + Number(sumTime[2]))
    const durationStr = `${dateTime.getHours()}:${dateTime.getMinutes()}:${dateTime.getSeconds()}`


    const addMusic = albumRepository.create({
        id,
        name,
        duration: durationStr,
        musics: [...musics, findMusic!],
        performer,
        createdAt
    })



    await albumRepository.save(addMusic)

    return addMusic
}

export default addMusicsToAlbumService