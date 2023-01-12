import { Request, Response, NextFunction } from "express"
import AppDataSource from "../data-source"
import { Users } from "../entities/users.entities"
import { AppError } from "../errors"


const ensureAuthAdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const userRepository = AppDataSource.getRepository(Users)

    const user = await userRepository.findOneBy({
        id: req.user.id
    })

    if(user!.isAdmin || req.user.id === req.params.id){
        return next()
    }
    
    throw new AppError("Not permission", 403)
}
export default ensureAuthAdminMiddleware