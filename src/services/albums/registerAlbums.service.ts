import AppDataSource from "../../data-source";
import { Albums } from "../../entities/albuns.entities";
import { IAlbumRequest, IAlbumResponse } from "../../interfaces/albums";
import { IUserResponse } from "../../interfaces/users";
import { resgisterAlbumResponse } from "../../serializers/albums";


const registerAlbumService = async (albumData: IAlbumRequest, performer: IUserResponse): Promise<IAlbumResponse> => {

    const albumRepository = AppDataSource.getRepository(Albums)

    const newAlbum = {
        ...albumData,
        duration: "0",
        performer
    }
    const createAlbum = albumRepository.create(newAlbum)
    await albumRepository.save(createAlbum)

    const returnedData = resgisterAlbumResponse.validate(createAlbum, {stripUnknown: true})


    return returnedData

}


export default registerAlbumService