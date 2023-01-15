import { Request, Response } from "express";
import { IMusicRequest } from "../../interfaces/musics";
import { musicsPostService } from "../../services";

const musicsPostController = async (req: Request, res: Response) => {
    const [data, response] = await musicsPostService(req)

    return res.status(data).json(response)
}

export default musicsPostController;