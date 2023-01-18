import AppDataSource from "../../data-source"
import { Users } from "../../entities/users.entities"
import { listAllAlbumsByPerformerSerializerResponse } from "../../serializers/albums"

const listAllAlbumsByPerformerService = async (performerId: string): Promise<object> => {
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
    return responseAlbumsFound!
}

export default listAllAlbumsByPerformerService