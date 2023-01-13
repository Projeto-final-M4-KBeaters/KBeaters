import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { Genres } from "../entities/genres.entities";
import { AppError } from "../errors";

const ensureGenreNotExistMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body.name;
    const genreRepo = AppDataSource.getRepository(Genres);
    const genre = await genreRepo.findOne({
        where: {name: name},
    });

    if(genre) {
        throw new AppError("Genre already exists", 400);
    }
    return next();
}

export default ensureGenreNotExistMiddleware;