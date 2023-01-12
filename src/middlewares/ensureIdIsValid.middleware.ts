import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Users } from "../entities/users.entities";
import { AppError } from "../errors";
Users


const ensureIdIsValidMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const userRepo = AppDataSource.getRepository(Users)

    const foundUser = await userRepo.findOneBy({id: req.params.id})

    if(!foundUser) {
        throw new AppError("User not exists", 404)
    }

    return next()
}

export default ensureIdIsValidMiddleware