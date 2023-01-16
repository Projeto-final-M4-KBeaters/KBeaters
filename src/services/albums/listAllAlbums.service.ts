import AppDataSource from "../../data-source"
import { Albums } from "../../entities/albuns.entities"
import { listAlbumResponseArray } from "../../serializers/albums"

const listAllAlbumsService = async() => {
    const albumRepository = AppDataSource.getRepository(Albums)

    const listAlbums = await albumRepository.find({
        relations: {
            musics: true,
            performer: true
        }
    })

    const returnedData = await listAlbumResponseArray.validate(listAlbums, 
        {
        stripUnknown: true
        }
    )

    return returnedData!
}

export default listAllAlbumsService