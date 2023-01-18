import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entities";
import { IPlaylistsUserResponse } from "../../interfaces/playlists";
import { listAllPlaylistsByUser } from "../../serializers/playlists";

const listUserPlaylistService = async (userId: string): Promise<object> => {

    const userRepository = AppDataSource.getRepository(Users)

    const listPlaylist = await userRepository.find({
        where: {
            id: userId
        },
        relations: {
            playlists: {
                musics: true
            }
        }
    })
    const playlist = await listAllPlaylistsByUser.validate(listPlaylist[0], {
        stripUnknown:true
    })
    
    return playlist
} 
export default listUserPlaylistService;