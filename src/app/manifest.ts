import {cookieConstant} from '@/constants/cookie.constant'
import {dashboardConstant} from '@/constants/dashboard.constant'
import {defaultLocale} from '@/i18n'
import type {MetadataRoute} from 'next'
import {getTranslations} from 'next-intl/server'
import {cookies} from 'next/headers'

export default async function manifest(): Promise<MetadataRoute.Manifest> {
    const cookieStore = cookies()
    const t = await getTranslations({
        namespace: 'Manifest',
        locale: defaultLocale
    })

    const theme = cookieStore.get(cookieConstant.THEME)?.value || 'system'

    return {
        name: t('name'),
        short_name: t('short-name'),
        description: t('description'),
        start_url: dashboardConstant.APP_PAGE,
        display: 'standalone',
        background_color: theme === 'dark' ? '#0B0B0B' : '#F4F4F4',
        theme_color: theme === 'dark' ? '#0B0B0B' : '#F4F4F4',
        icons: [
            {
                type: 'image/png',
                sizes: '16x16',
                src: '/icons/favicon-16x16.png'
            },
            {
                type: 'image/png',
                sizes: '32x32',
                src: '/icons/favicon-32x32.png'
            },
            {
                type: 'image/png',
                sizes: '192x192',
                src: '/icons/favicon-192x192.png'
            },
            {
                type: 'image/png',
                sizes: '512x512',
                src: '/icons/favicon-512x512.png'
            },
            {
                type: 'image/png',
                sizes: '1024x1024',
                src: '/icons/favicon-1024x1024.png'
            },
            {
                type: 'image/png',
                sizes: '180x180',
                src: '/icons/favicon-180x180.png'
            }
        ]
    }
}
