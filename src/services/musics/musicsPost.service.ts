import { Request } from "express";
import AppDataSource from "../../data-source";
import { Genres } from "../../entities/genres.entities";
import { Musics } from "../../entities/musics.entities";
import { Users } from "../../entities/users.entities";
import { IMusicRequest } from "../../interfaces/musics";
import { musicsResponseSerializer } from "../../serializers/musics";

const musicsPostService = async (req: Request): Promise<[number, object]> => {
    const { name, duration, genreId, featsId } = req.body as IMusicRequest;
    
    const performer = req.user;
    const usersRepo = AppDataSource.getRepository(Users);
    const musicsRepo = AppDataSource.getRepository(Musics);
    const genreRepo = AppDataSource.getRepository(Genres);
    const feats = [] as Users[]
    
    if(featsId){
        const featsPromise = featsId.map(async (id) => {
            const featUser = await usersRepo.find({
                where:{
                    id: id,
                    isPerformer: true
                }
            })
            return featUser[0];
        })
        await Promise.all(featsPromise)
        .then(res => {
           res.forEach(item => {
            if(item) feats.push(item);
           })
        })
    }
    
    const genre = await genreRepo.findOne({
        where: {
            id: genreId
        }
    })
    if(!genre){
        return [404, { message: "Genre not found." }]
    }

    const newMusic = {
        name,
        performer,
        duration,
        feats,
        genre
    }
    const music = musicsRepo.create(newMusic);
    const musicSave = await musicsRepo.save(music);
    const response = await musicsResponseSerializer.validate(
        musicSave,
        {
          stripUnknown: true,
        }
    )

    return [201, response]
}

export default musicsPostService;