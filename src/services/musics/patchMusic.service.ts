import AppDataSource from "../../data-source";
import { Musics } from "../../entities/musics.entities";
import { AppError } from "../../errors";
import { IMusicPatchRequest, IMusicPatchResponse, IMusicRequest, IMusicResponse } from "../../interfaces/musics";
import { musicPatchSerializer, musicsResponseSerializer } from "../../serializers/musics";

const patchMusicService = async(musicDataUpdated:IMusicPatchRequest,musicData:IMusicResponse,musicId:string): Promise<IMusicPatchResponse> => {

    const musicsRepo = AppDataSource.getRepository(Musics)
    
    
    const newMusic = musicsRepo.create({
        ...musicData,
        ...musicDataUpdated
    })
    
    
    
    const music = await musicsRepo.save(newMusic)
    
    
    const findMusic = await musicsRepo.createQueryBuilder("musics")
    .innerJoinAndSelect("musics.genre", "genres")
    .innerJoinAndSelect("musics.performer","performer")
    .where("musics.id = :id_musics", { id_musics: musicId})
    .getOne()

    
    musicData.updatedAt = new Date
    
    const returnedData = await musicPatchSerializer.validate(findMusic, {
        stripUnknown: true
    })

    return returnedData
}

export default patchMusicService