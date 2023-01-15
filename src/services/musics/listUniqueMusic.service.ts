import AppDataSource from "../../data-source"
import { Musics } from "../../entities/musics.entities"

const listUniqueMusicService = async (musicId: string): Promise<Musics> => {
    const musicsRepo = AppDataSource.getRepository(Musics)

    const music = await musicsRepo.findOneBy({id: musicId})

    return music!
}

export default listUniqueMusicService