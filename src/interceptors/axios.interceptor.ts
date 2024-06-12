import axios, {type CreateAxiosDefaults} from 'axios'
import {getAccessToken, removeTokens} from '@/services/auth-token.service'
import {authService} from '@/services/auth.service'
import {envConstant} from '@/constants/env.constant'
import {catchErrorsInterceptor} from '@/interceptors/catch-errors.interceptor'

const options: CreateAxiosDefaults = {
    baseURL: envConstant.NEXT_PUBLIC_API_HOST,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
}

const axiosWithoutAuth = axios.create(options)
const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use(config => {
    const accessToken = getAccessToken()

    if (config?.headers && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
})

axiosWithAuth.interceptors.response.use(
    config => config,
    async error => {
        const originalConfig = error.config

        if (
            error?.response?.status === 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            originalConfig._isRetry = true
            try {
                await authService.getNewTokens()
                return axiosWithAuth.request(originalConfig)
            } catch (error) {
                // if (error?.response?.status === 401) {
                // }
                removeTokens()
                throw catchErrorsInterceptor(error)
            }
        }

        throw catchErrorsInterceptor(error)
    }
)

export {axiosWithoutAuth, axiosWithAuth}
