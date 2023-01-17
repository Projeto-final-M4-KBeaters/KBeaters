import AppDataSource from "../../data-source"
import { Albums } from "../../entities/albuns.entities"
import { Users } from "../../entities/users.entities"
import { listAlbumResponseArray, listAllAlbumsByPerformerSerializerResponse } from "../../serializers/albums"

const listAllAlbumsByPerformerService = async (performerId: string) => {
    const user = AppDataSource.getRepository(Users)

    const findAlbums = await user.find({
        where: {
            id: performerId
        },
        relations: {
            albums: {
                musics: true
            }

        }
    })

    const responseAlbumsFound = await listAllAlbumsByPerformerSerializerResponse.validate(findAlbums,{
        stripUnknown:true
    })
    return responseAlbumsFound
}

export default listAllAlbumsByPerformerService