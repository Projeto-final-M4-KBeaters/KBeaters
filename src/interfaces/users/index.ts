interface IUserLogin {
    email: string
    password: string
}

interface IUserRequest{
    name: string
    password: string
    email: string
    isPerformer?: boolean
}

interface IUserResponse{
    id: string
    name: string
    email: string
    isPerformer: boolean
    isAdmin: boolean
    isActive: boolean
    createdAt: Date
    updatedAt: Date
}

export {IUserLogin, IUserRequest, IUserResponse}