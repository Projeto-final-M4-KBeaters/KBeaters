import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entities";
import { listUsersResponseSerializer } from "../../serializers/users";

const listAllPerformersService = async () => {
  const userRepository = AppDataSource.getRepository(Users);

  const listAllPerformers = await userRepository.find({
    where: {
      isPerformer: true,
    },
  });

  console.log(listAllPerformers);

  const returnedData = await listUsersResponseSerializer.validate(
    listAllPerformers,
    {
      stripUnknown: true,
    }
  );

  console.log(returnedData);

  return listAllPerformers;
};

export default listAllPerformersService;
