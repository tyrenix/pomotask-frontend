import createMiddleware from 'next-intl/middleware'
import {locales, defaultLocale, localePrefix} from './i18n'

export default createMiddleware({
    locales,
    defaultLocale,
    localePrefix: localePrefix as any,
    localeDetection: false
})

export const config = {
    matcher: ['/', '/((?!_next|_vercel|manifest.webmanifest|.*\\..*).*)']
}
