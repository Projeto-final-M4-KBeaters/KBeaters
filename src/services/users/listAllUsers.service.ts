import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entities";
import { listUsersResponseSerializer } from "../../serializers/users";

const listAllUsersService = async () => {
  
  const userRepository = AppDataSource.getRepository(Users)

  const listAllUsers = await userRepository.find()

  const returnedData = await listUsersResponseSerializer.validate(
    listAllUsers,
    {
      stripUnknown: true,
    }
  )

  return returnedData

}

export default listAllUsersService;