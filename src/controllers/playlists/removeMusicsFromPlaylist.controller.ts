import { Request, Response } from "express";
import { addMusicsToPlaylistService, removeMusicsFromPlaylistsService } from "../../services";

const removeMusicsFromPlaylistController = async (req: Request, res: Response) => {
    const response = await removeMusicsFromPlaylistsService(req);

    return res.status(200).json(response);
}

export default removeMusicsFromPlaylistController;