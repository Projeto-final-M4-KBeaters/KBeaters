import { IUserLogin } from "../../interfaces/users"

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

export {mockedAdminLogin, mockedPerformerLogin, mockedUserLogin}