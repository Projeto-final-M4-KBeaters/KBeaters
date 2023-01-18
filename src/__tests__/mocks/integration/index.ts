import { IGenreRequest } from "../../../interfaces/genres"
import { IMusicRequest } from "../../../interfaces/musics"
import { IUserRequest, IUserPatchRequest, IUserLogin } from "../../../interfaces/users"


const mockedUserRegister : IUserRequest={
    name: "JP",
    email: "jp@mail.com",
    password: "123456",
    isPerformer: false,
}

const mockedAdminRegister : IUserRequest={
    name: "igordelas",
    email: "igordelas@mail.com",
    password: "123456",
    isPerformer: false
}

const mockedPerformerRegister : IUserRequest={
    name: "lucas",
    email: "schmitao@mail.com",
    password: "123456",
    isPerformer: true
}

const mockedInactiveRegister : IUserPatchRequest={
    name: "lucas",
    email: "schmitao@mail.com",
    password: "123456",
    isPerformer: false
}

const mockedUserLogin : IUserLogin = {
    email: "jp@mail.com",
    password: "123456"
}

const mockedAdminLogin : IUserLogin = {
    email: "igordelas@mail.com",
    password: "123456"
}

const mockedPerformerLogin : IUserLogin = {
    email: "schmitao@mail.com",
    password: "123456"
}

const mockedGenrePost : IGenreRequest = {
    name: "forrozim"
}


export {mockedAdminLogin, mockedGenrePost, mockedInactiveRegister, mockedPerformerLogin, mockedUserLogin, mockedUserRegister,mockedAdminRegister, mockedPerformerRegister}