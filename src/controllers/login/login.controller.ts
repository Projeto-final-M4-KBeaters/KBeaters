import { Request, Response } from 'express'
import { IUserLogin } from '../../interfaces/users'
import { loginService } from '../../services'


export const createloginController = async(req: Request, res: Response) => {
    
    const sessionData: IUserLogin = req.body
    const token = await loginService(sessionData)
    return res.json({token})

}



