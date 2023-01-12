import { IUserLogin, IUserRequest } from "../../interfaces/users"

const mockedUserRegister : IUserRequest={
    name: "JP",
    email: "jp@mail.com",
    password: "123456",
    isPerformer: false,
}

const mockedAdminRegister : IUserRequest={
    name: "lucas",
    email: "schmitao@mail.com",
    password: "123456",
}

const mockedPerformerRegister : IUserRequest={
    name: "lucas",
    email: "schmitao@mail.com",
    password: "123456",
    isPerformer: true
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

export {mockedAdminLogin, mockedPerformerLogin, mockedUserLogin, mockedUserRegister,mockedAdminRegister, mockedPerformerRegister}