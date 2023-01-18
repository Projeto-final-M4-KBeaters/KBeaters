import AppDataSource from "../../data-source"
import { Playlists } from "../../entities/playlists.entities"

const deletePLaylistService = async (playlistId: string): Promise<object> => {
    const playlistRepo = AppDataSource.getRepository(Playlists)

    const playlist = await playlistRepo.findOneBy({id: playlistId})

    playlist!.isActive = false

    return {}
}

export default deletePLaylistService