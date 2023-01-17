import { Request } from "express";
import AppDataSource from "../../data-source";
import { Albums } from "../../entities/albuns.entities";
import { AppError } from "../../errors";
import { IAlbumRequest } from "../../interfaces/albums";
import { listResponseSerializer } from "../../serializers/albums";

const patchAlbumService = async (req: Request) => {
    const albumsRepo = AppDataSource.getRepository(Albums);
    const album = await albumsRepo.findOne({
        where: {
            id: req.params.id
        },
        relations: {
            musics: true
        }
    })
    if(album){
        const { name } = req.body;
        album.name = name;
        await albumsRepo.save(album);
        // const response = listResponseSerializer.validate(album, {
        //     stripUnknown: true
        // })
        return album
    }
    throw new AppError ("Album not found", 404);

}

export default patchAlbumService;