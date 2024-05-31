import {
    createLocalizedPathnamesNavigation,
    Pathnames
} from 'next-intl/navigation'
import {locales, localePrefix} from '@/i18n'

export const {
    Link,
    redirect,
    useRouter,
    permanentRedirect,
    usePathname,
    getPathname
} = createLocalizedPathnamesNavigation({
    locales,
    localePrefix: localePrefix as any,
    pathnames: {}
})
