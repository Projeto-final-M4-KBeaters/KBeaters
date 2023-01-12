import { compare } from "bcryptjs";
import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entities";
import { AppError } from "../../errors";
import { IUserLogin } from "../../interfaces/users";
import { userRegisterResponseSerializer } from "../../serializers/users";

const reactiveUserService = async (userData: IUserLogin) => {

  const userRepository = AppDataSource.getRepository(Users)
  const findUser = await userRepository.findOne({
    withDeleted: true,
    
    where: {

        email: userData.email,
    } 
    
  })
  console.log(findUser)
  
    if (!findUser) {
        throw new AppError("User not exists", 404)
    }
    
    if(findUser.isActive){
        throw new AppError("User already active", 409)
    }

  const passwordMatch = await compare(userData.password, findUser.password)
    console.log(findUser.password, userData.password)
  if(!passwordMatch){
      throw new AppError("Email or password invalid", 403)
  }

  findUser.isActive = true

  await userRepository.save(findUser)
  
  const returnedData = await userRegisterResponseSerializer.validate(
    findUser,
    {
      stripUnknown: true,
    }
  )

  return returnedData
  
}

export default reactiveUserService;