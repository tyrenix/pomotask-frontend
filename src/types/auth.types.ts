import {IUser} from '@/types/user.types'

export interface IAuthForm {
    email: string
    password: string
}

export interface IAuthResponse extends IUser {
    accessToken: string
}

export interface IUpdateTokens {
    accessToken: string
}
