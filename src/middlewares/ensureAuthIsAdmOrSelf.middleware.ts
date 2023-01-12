import { Request, Response, NextFunction } from "express"
import AppDataSource from "../data-source"
import { Users } from "../entities/users.entities"
import { AppError } from "../errors"


const ensureAuthAdminOrSelfMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user

    if(user!.isAdmin || user.id === req.params.id){
        return next()
    }
    
    throw new AppError("Not permission", 403)
}
export default ensureAuthAdminOrSelfMiddleware