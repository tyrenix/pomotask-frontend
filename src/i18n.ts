import {cookies} from 'next/headers'
import {getRequestConfig} from 'next-intl/server'
import {cookieConstant} from '@/constants/cookie.constant'

export const locales: string[] = ['ru', 'en']
export const defaultLocale: string = 'ru'

export default getRequestConfig(async () => {
    const cookieStore = cookies()
    let locale: string = cookieStore.get('locale')?.value || defaultLocale

    if (!locales.includes(locale)) {
        cookieStore.set(cookieConstant.LOCALE, defaultLocale)
        locale = defaultLocale
    }

    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default
    }
})
