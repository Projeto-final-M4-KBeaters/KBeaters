import AppDataSource from "../../data-source";
import { Musics } from "../../entities/musics.entities";

const deleteMusicService =  async (musicId: string): Promise<object> => {

    const musicRepository =  AppDataSource.getRepository(Musics)

    const music = await musicRepository.findOneBy({
        id: musicId
    })

    music!.deletedAt = true
    await musicRepository.save(music!)

    return {}

}

export default deleteMusicService;