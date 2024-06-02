import axios, {type CreateAxiosDefaults} from 'axios'
import {getAccessToken, removeAccessToken} from '@/services/auth-token.service'
import {authService} from '@/services/auth.service'

const options: CreateAxiosDefaults = {
    baseURL: process.env.API_HOST,
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
        const originalRequest = error.config

        if (
            originalRequest?.response?.status === 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true
            try {
                await authService.getNewTokens()
                return axiosWithAuth.request(originalRequest)
            } catch (err) {
                console.log(err)
                // @ts-ignore
                if (err?.response?.status === 401) {
                    removeAccessToken()
                }
            }
        }

        throw error
    }
)

export {axiosWithoutAuth, axiosWithAuth}
