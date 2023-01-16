import AppDataSource from "../../data-source";
import { Albums } from "../../entities/albuns.entities";
import { listMusicsByAlbumResponseSerializer } from "../../serializers/albums";

const listAlbumService = async (idAlbum: string): Promise<object> => {

    const albumRepository = AppDataSource.getRepository(Albums)
    
    const musics = await albumRepository.createQueryBuilder("albums")
    .innerJoinAndSelect("albums.musics", "musics")
    .innerJoinAndSelect("albums.performer", "users")
    .where("albums.id = :id_album", { id_album: idAlbum})
    .getOne()
    
    const musicResponse = await listMusicsByAlbumResponseSerializer.validate(musics, {
            stripUnknown: true
        }
    )
        
    return musicResponse

}
export default listAlbumService;