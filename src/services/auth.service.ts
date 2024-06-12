import {axiosWithoutAuth} from '@/interceptors/axios.interceptor'
import {removeTokens, saveAccessToken} from '@/services/auth-token.service'
import {IAuthForm, IAuthResponse, IGetNewTokens} from '@/types/auth.types'
import {catchErrorsInterceptor} from '@/interceptors/catch-errors.interceptor'

class AuthService {
    private readonly PREFIX = '/auth'

    async main(
        type: 'login' | 'register',
        data: IAuthForm
    ): Promise<IAuthResponse> {
        const response = await axiosWithoutAuth
            .post<IAuthResponse>(`${this.PREFIX}/${type}`, data)
            .catch(error => {
                throw catchErrorsInterceptor(error)
            })

        if (response?.data?.accessToken) {
            saveAccessToken(response?.data?.accessToken)
        }

        return response.data
    }

    async getNewTokens(): Promise<IGetNewTokens> {
        const response = await axiosWithoutAuth.post<IGetNewTokens>(
            `${this.PREFIX}/tokens`
        )

        if (response?.data?.accessToken) {
            saveAccessToken(response?.data?.accessToken)
        }

        return response.data
    }

    async logout(): Promise<{success: true}> {
        const response = await axiosWithoutAuth
            .post<{success: true}>(`${this.PREFIX}/logout`)
            .catch(error => {
                throw catchErrorsInterceptor(error)
            })

        if (response?.data) {
            removeTokens()
        }

        return response.data
    }
}

export const authService = new AuthService()
