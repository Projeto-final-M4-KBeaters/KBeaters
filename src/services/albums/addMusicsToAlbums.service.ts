import AppDataSource from "../../data-source"
import { Albums } from "../../entities/albuns.entities"
import { Musics } from "../../entities/musics.entities"
import { AppError } from "../../errors"
import { IAlbumResponse, IlistAlbumResponse } from "../../interfaces/albums"
import { listAlbumResponseSerializer } from "../../serializers/albums"


const addMusicsToAlbumService = async (albumID: string, musicID: string): Promise<IAlbumResponse> => {

    const albumRepository = AppDataSource.getRepository(Albums)
    const musicRepository = AppDataSource.getRepository(Musics)

    const findMusic = await musicRepository.findOne({
        where: {
            id: musicID
        },
    })

    const findAlbum = await albumRepository.findOne({
        where: {
            id: albumID
        },
        relations: {
            musics: true,
            performer: true
        }
    })


    const { id, name, duration, musics, performer, createdAt, updatedAt, isActive } = findAlbum as IlistAlbumResponse

    if (musics.find(music => music.id === findMusic?.id)) {
        throw new AppError("Music Already Exists In Album", 409)
    }


    const sumTime = findMusic!.duration.split(":")
    const time = duration.split(":")
    const dateTime = new Date()
    dateTime.setHours(
        Number(sumTime[0]) + Number(time[0]),
        Number(sumTime[1]) + Number(time[1]),
        Number(sumTime[2]) + Number(time[2])
    )
    const hours = dateTime.getHours() > 9 ? dateTime.getHours() : "0" + dateTime.getHours();
    const minutes = dateTime.getMinutes() > 9 ? dateTime.getMinutes() : "0" + dateTime.getMinutes();
    const seconds = dateTime.getSeconds() > 9 ? dateTime.getSeconds() : "0" + dateTime.getSeconds();

    const durationStr = `${hours}:${minutes}:${seconds}`;


    const addMusic = albumRepository.create({
        id,
        name,
        duration: durationStr,
        musics: [...musics, findMusic!],
        performer,
        createdAt,
        updatedAt,
        isActive
    })



    const musicSave = await albumRepository.save(addMusic)
    const response = await listAlbumResponseSerializer.validate(musicSave, { stripUnknown: true })
    return response
}

export default addMusicsToAlbumService