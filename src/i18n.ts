import {getRequestConfig} from 'next-intl/server'

export const locales: string[] = ['ru', 'en']
export const defaultLocale: string = 'ru'
export const localePrefix: string = 'as-needed'

export default getRequestConfig(async ({locale}) => {
    if (!locales.includes(locale as any)) {
        locale = defaultLocale
    }

    return {
        messages: (await import(`../messages/${locale}.json`)).default
    }
})
