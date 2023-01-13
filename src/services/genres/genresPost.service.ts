import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../data-source";
import { Genres } from "../../entities/genres.entities";

const genrePostService = async (req: Request) => {
    const body = req.body;
    const genreRepo = AppDataSource.getRepository(Genres);
    const genre = genreRepo.create(body);
    const response = await genreRepo.save(genre);

    return response;
}

export default genrePostService;