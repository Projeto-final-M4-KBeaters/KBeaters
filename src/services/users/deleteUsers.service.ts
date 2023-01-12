import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entities";
import { AppError } from "../../errors";


const deleteUserService =  async (userId: string) => {

    const userRepository =  AppDataSource.getRepository(Users)

    const user = await userRepository.findOneBy({
        id: userId
    })

    if(!user){
        throw new AppError("Invalid id", 404)
    }

    user.isActive = false
    userRepository.save(user)

}

export default deleteUserService