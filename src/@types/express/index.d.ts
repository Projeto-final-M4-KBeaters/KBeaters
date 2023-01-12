import * as express from 'express'
import { Users } from '../../entities/users.entities';
import { IUserPatchRequest, IUserRequest, IUserResponse } from '../../interfaces/users'

declare global {
    namespace Express {
        interface Request {
            user: IUserResponse;
            providedUser: Users;
            validatedPatchBody: IUserPatchRequest;
        }
    }
}