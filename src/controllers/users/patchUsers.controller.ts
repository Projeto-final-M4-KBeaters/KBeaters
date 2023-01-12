import { Request, Response } from "express";
import { IUserResponse } from "../../interfaces/users";
import { patchUserService } from "../../services";

const patchUserController = async (req: Request, res: Response) => {
    const data = await patchUserService(req);

    return res.status(200).json(data);
}

export default patchUserController