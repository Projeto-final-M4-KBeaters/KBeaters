import AppDataSource from "../../data-source"
import { Albums } from "../../entities/albuns.entities"
import { Musics } from "../../entities/musics.entities"
import { AppError } from "../../errors"
import { IlistAlbumResponse } from "../../interfaces/albums"

const removeMusicFromAlbumService = async(albumID:string,musicID:string): Promise<object> => {

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

    const sumTime = duration.split(":") 
    const time = findMusic!.duration.split(":")
    const dateTime = new Date()
    dateTime.setHours(
        Number(sumTime[0]) - Number(time[0]),
        Number(sumTime[1]) - Number(time[1]),
        Number(sumTime[2]) - Number(time[2])
    );
    const hours = dateTime.getHours() > 9 ? dateTime.getHours() : "0"+dateTime.getHours();
    const minutes = dateTime.getMinutes() > 9 ? dateTime.getMinutes() : "0"+dateTime.getMinutes();
    const seconds = dateTime.getSeconds() > 9 ? dateTime.getSeconds() : "0"+dateTime.getSeconds();
    const durationStr = `${hours}:${minutes}:${seconds}`;

    const newMusics = musics.filter((music) => music.id !== findMusic?.id)

    if(!musics.find(music => music.id === findMusic?.id)){
        throw new AppError("Music Already In Album", 409)
    }

    const removeMusic = albumRepository.create({
        id,
        name,
        duration: durationStr,
        musics: newMusics,
        performer,
        createdAt
    })



    await albumRepository.save(removeMusic)

    return removeMusic

}

export default removeMusicFromAlbumService