import AppDataSource from "../../data-source"
import { Playlists } from "../../entities/playlists.entities"

const deletePLaylistService = async (playlistId: string): Promise<object> => {
    const playlistRepo = AppDataSource.getRepository(Playlists)

    const playlist = await playlistRepo.findOne({
        where: {
            id: playlistId
        },
        relations: {
            user: true,
            musics: true
        }
    })

    playlist!.isActive = false

    await playlistRepo.save(playlist!)

    return {}
}

export default deletePLaylistService