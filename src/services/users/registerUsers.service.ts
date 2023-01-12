import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entities";
import { AppError } from "../../errors";
import { IUserRequest } from "../../interfaces/users";
import { userRegisterResponseSerializer } from "../../serializers/users";

const registerUserService = async (usersData: IUserRequest) => {

  const userRepository = AppDataSource.getRepository(Users)

  const userExist = await userRepository.findOneBy({
    email: usersData.email,
  })

  if (userExist) {
    throw new AppError("Already exists", 409);
  }

  const createdUser = userRepository.create(usersData)

  await userRepository.save(createdUser)
  
  const returnedData = await userRegisterResponseSerializer.validate(
    createdUser,
    {
      stripUnknown: true,
    }
  )

  return returnedData
  
}

export default registerUserService;
