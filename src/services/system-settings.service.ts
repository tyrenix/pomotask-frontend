import {cookieConstant} from '@/constants/cookie.constant'
import {IContext} from '@/context/system-settings.context'
import {setCookie} from 'cookies-next'

export const setLanguage = (language: string) => {
    setCookie(cookieConstant.LOCALE, language, {
        sameSite: 'strict'
    })
}

export const setTheme = (theme: IContext['theme']) => {
    setCookie(cookieConstant.THEME, theme, {
        sameSite: 'strict'
    })
}
