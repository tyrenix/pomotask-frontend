import {IAuthForm, IAuthResponse, IGetNewTokens} from '@/types/auth.types'
import {axiosWithAuth, axiosWithoutAuth} from '@/api/interceptors'
import {removeAccessToken, saveAccessToken} from '@/services/auth-token.service'
import {AxiosResponse} from 'axios'
import {envConstant} from '@/constants/env.constant'

class AuthService {
    async main(
        type: 'login' | 'register',
        data: IAuthForm
    ): Promise<AxiosResponse<IAuthResponse>> {
        const response = await axiosWithoutAuth.post<IAuthResponse>(
            `/auth/${type}`,
            data
        )

        if (response?.data?.accessToken) {
            saveAccessToken(response?.data?.accessToken)
        }

        return response
    }

    async getNewTokens(): Promise<AxiosResponse<IGetNewTokens>> {
        const response =
            await axiosWithoutAuth.post<IGetNewTokens>(`/auth/tokens`)

        if (response?.data?.accessToken) {
            saveAccessToken(response?.data?.accessToken)
        }

        return response
    }

    async logout(): Promise<{success: true}> {
        const response = await axiosWithoutAuth.post<{success: true}>(
            '/auth/logout'
        )

        if (response?.data) {
            removeAccessToken()
        }

        return response?.data
    }
}

export const authService = new AuthService()
