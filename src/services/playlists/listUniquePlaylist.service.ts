
import { Playlists } from "../../entities/playlists.entities"
import {listAllPlaylistsSerializer} from "../../serializers/playlists"

const listUniquePlaylistService = async (foundedPlaylist: Playlists) => {

    

    const playlistResponse = await listAllPlaylistsSerializer.validate(foundedPlaylist, {
        stripUnknown: true
    })

    return playlistResponse

    
}

export default listUniquePlaylistService