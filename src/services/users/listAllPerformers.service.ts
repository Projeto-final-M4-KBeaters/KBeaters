import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entities";
import { listUsersResponseSerializer } from "../../serializers/users";

const listAllPerformersService = async () => {

  const userRepository = AppDataSource.getRepository(Users)

  const listAllPerformers = await userRepository.find({
    where: {
      isPerformer: true,
    },
  })

  const returnedData = await listUsersResponseSerializer.validate(
    listAllPerformers,
    {
      stripUnknown: true,
    }
  )

  return returnedData

}

export default listAllPerformersService;
