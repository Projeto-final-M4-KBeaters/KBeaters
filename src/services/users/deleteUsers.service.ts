import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entities";


const deleteUserService =  async (userId: string) => {

    const userRepository =  AppDataSource.getRepository(Users)

    const user = await userRepository.findOneBy({
        id: userId
    })

    user!.isActive = false
    userRepository.save(user!)

}

export default deleteUserService