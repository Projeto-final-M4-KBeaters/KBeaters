import AppDataSource from "../../data-source";
import { Playlists } from "../../entities/playlists.entities";
import { IPlaylistResponse } from "../../interfaces/playlists";
import { listPlaylistsResponseArray } from "../../serializers/playlists";

const listAllPlaylistsService = async () => {
    const playlistRepository =  AppDataSource.getRepository(Playlists)

    const listPlaylists = await playlistRepository.find({
        relations: {
            musics: true,
            user: true
        }
    })
    
    const playlists = await listPlaylistsResponseArray.validate(listPlaylists, {
        stripUnknown:true
    })
    
    return playlists
} 
export default listAllPlaylistsService;