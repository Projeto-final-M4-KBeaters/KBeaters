import AppDataSource from "../../data-source"
import { Musics } from "../../entities/musics.entities"
import { Users } from "../../entities/users.entities"
import { IListMusicsByPerformer } from "../../interfaces/musics"


const listAllMusicsByPerformerService = async (performerId:string): Promise<object> => {
    const performerRepository = AppDataSource.getRepository(Users)
    const musicsRepository = AppDataSource.getRepository(Musics)

    const performer = await performerRepository.findOneBy({
        id: performerId
    })
    const performerMusics = await musicsRepository.createQueryBuilder("musics")
    .innerJoinAndSelect("musics.performer", "performer")
    .where("performer.id = :id_performer",{id_performer: performer!.id})
    .getMany()
    return performerMusics
}

export default listAllMusicsByPerformerService