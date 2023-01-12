import { compare } from "bcryptjs"
import AppDataSource from "../../data-source"
import { IUserLogin } from "../../interfaces/users"
import jwt from 'jsonwebtoken'
import { Users } from "../../entities/users.entities"
import { AppError } from "../../errors"

const loginService = async ( { email, password }: IUserLogin ): Promise<string> => {

    const userRepository = AppDataSource.getRepository(Users)

    const user = await userRepository.findOneBy({
        email: email
    })
    
    if(!user){
        throw new AppError('User or password invalid', 403)
    }
    if(!user.isActive){
        throw new AppError('usuario inativo', 400)
    }
    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch){
        throw new AppError('User or password invalid', 403)
    }

    const token = jwt.sign(
        {email:user.id},
        process.env.SECRET_KEY as string,
        {
            subject: String(user.id), 
            expiresIn: '24h'
        }
    )

    return token

}

export default loginService