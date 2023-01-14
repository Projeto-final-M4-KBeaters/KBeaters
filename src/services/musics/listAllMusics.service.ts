import AppDataSource from "../../data-source"
import { Musics } from "../../entities/musics.entities"

const listAllMusicsService = async (): Promise<Musics[]> => {
    const musicRepo = AppDataSource.getRepository(Musics)

    const musicsList = await musicRepo.find()

    return musicsList
}

export default listAllMusicsService