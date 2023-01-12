import AppDataSource from "../../data-source"
import { Users } from "../../entities/users.entities"
import { userRegisterResponseSerializer } from "../../serializers/users"

const listUserService = async (userId: string) => {
    const userRepo = AppDataSource.getRepository(Users)

    const user = await userRepo.findOneBy({id: userId})

    const userResponse = await userRegisterResponseSerializer.validate(user, {
        stripUnknown: true
    })

    console.log(userResponse)

    return userResponse
}

export default listUserService