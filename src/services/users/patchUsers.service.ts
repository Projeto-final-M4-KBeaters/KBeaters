import { hashSync } from "bcryptjs";
import { Request } from "express";
import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entities";
import { IUserResponse } from "../../interfaces/users";
import { userRegisterResponseSerializer } from "../../serializers/users";

const patchUserService = async (req: Request): Promise<IUserResponse> => {
    const userPatch = req.validatedPatchBody;
    const userRepo = AppDataSource.getRepository(Users);
    const newUser = userRepo.create({
        ...req.providedUser,
        ...userPatch
    })
    const user = await userRepo.save(newUser);
    const response = await userRegisterResponseSerializer.validate(user, {
        stripUnknown: true
    })
    return response;
}

export default patchUserService;