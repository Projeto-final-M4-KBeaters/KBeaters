import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entities";


const deleteUserService =  async (userId: string) => {

    const userRepository =  AppDataSource.getRepository(Users)

    const user = await userRepository.findOneBy({
        id: userId
    })

    user!.isActive = false
    await userRepository.save(user!)

    return user

}

export default deleteUserService;