import { Request } from "express";
import AppDataSource from "../../data-source";
import { Albums } from "../../entities/albuns.entities";
import { AppError } from "../../errors";
import { IAlbumRequest } from "../../interfaces/albums";
import { listResponseSerializer } from "../../serializers/albums";

const patchAlbumService = async (req: Request) => {
    const albumsRepo = AppDataSource.getRepository(Albums);
    const album = await albumsRepo.findOne({
        relations: {
            musics: {
                performer: true
            },
            performer : true
        },
        where: {
            id: req.params.id,
            performer: {
                id: req.user.id
            }
            
        },
    })
    if(album){
        const { name } = req.body;
        album.name = name;
        await albumsRepo.save(album);
        const response = listResponseSerializer.validate(album, {
            stripUnknown: true
        })
        return response
    }
    throw new AppError ("You don't own such album.", 400);

}

export default patchAlbumService;