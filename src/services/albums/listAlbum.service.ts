import AppDataSource from "../../data-source";
import { Albums } from "../../entities/albuns.entities";
import { IAlbumResponse } from "../../interfaces/albums";
import {listResponseSerializer } from "../../serializers/albums";

const listAlbumService = async (idAlbum: string): Promise<IAlbumResponse> => {
    const albumRepository = AppDataSource.getRepository(Albums)
    

    const findAlbum = await albumRepository.findOne({
        where: {
            id: idAlbum
        },
        relations: {
            performer:true,
            musics:true
        }
    })
    
    
    const musicResponse = await listResponseSerializer.validate(findAlbum, {
            stripUnknown: true
        }
    )
        
    return musicResponse

}
export default listAlbumService;