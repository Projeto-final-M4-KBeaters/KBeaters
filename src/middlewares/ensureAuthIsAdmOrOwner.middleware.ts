import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";
import AppDataSource from "../data-source";
import { Musics } from "../entities/musics.entities";


const ensureAuthIsAdmOrOwnerMiddleware = async (req: Request, res:Response, next: NextFunction) => {

    const musicRepository = AppDataSource.getRepository(Musics)

    const musics = await musicRepository.createQueryBuilder("musics")
    .innerJoinAndSelect("musics.performer", "users")
    .where("users.id = :id_owner", { id_owner: req.user.id})
    .where("musics.id = :id_music", { id_music: req.params.id })
    .getMany()

    if(musics[0].deletedAt){
        throw new AppError("music has already been deleted", 403)
    }

    if(musics[0].id === req.params.id){
        if(req.user.isAdmin || req.user.id === musics[0].performer.id){
            return next()
        }
    }

    if(musics[0].id !== req.params.id){
        throw new AppError("Music not exist", 403)
    }

    throw new AppError("Not permission", 403)

}
export default ensureAuthIsAdmOrOwnerMiddleware;