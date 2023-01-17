import AppDataSource from "../../data-source"
import { Albums } from "../../entities/albuns.entities"
import { Users } from "../../entities/users.entities"


const listAllAlbumsByPerformerService = async (performerId: string) => {
    const albums = AppDataSource.getRepository(Albums)

    const findAlbums = await albums.createQueryBuilder("albums")
    .innerJoinAndSelect("albums.performer", "performer")
    .where("performer.id = :id_performer", {id_performer: performerId})
    .getMany()

    return findAlbums
}

export default listAllAlbumsByPerformerService