import { Request, Response } from "express";
import { genrePostService } from "../../services";

const genrePostController = async (req: Request, res: Response) => {
    const genrePost = await genrePostService(req);
    return res.status(201).json(genrePost);
}

export default genrePostController;