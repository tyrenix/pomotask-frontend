import {setCookie, deleteCookie, getCookie} from 'cookies-next'
import {cookieConstant} from '@/constants/cookie.constant'

export const getAccessToken = (): string | null => {
    const accessToken = getCookie(cookieConstant.ACCESS_TOKEN)
    return accessToken || null
}

export const saveAccessToken = (accessToken: string): void => {
    setCookie(cookieConstant.ACCESS_TOKEN, accessToken, {
        domain: process.env.DOMAIN,
        sameSite: 'strict'
    })
}

export const removeAccessToken = () => {
    deleteCookie(cookieConstant.ACCESS_TOKEN)
}
