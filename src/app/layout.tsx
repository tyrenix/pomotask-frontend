import type {Metadata, Viewport} from 'next'
import {Toaster} from 'sonner'
import {Nunito} from 'next/font/google'
import {PropsWithChildren} from 'react'
import {NextIntlClientProvider} from 'next-intl'
import {getLocale, getMessages, getTranslations} from 'next-intl/server'
import {cookies} from 'next/headers'
import {TanStackQueryProvider} from '@/providers/tanStack-query.provider'
import {cookieConstant} from '@/constants/cookie.constant'
import {seoConstants} from '@/constants/seo.constant'
import {envConstant} from '@/constants/env.constant'

import '@/styles/globals.styles.css'
import '@/styles/theme.styles.css'

const nunito = Nunito({subsets: ['latin', 'cyrillic']})

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 1
}

export const generateMetadata = async (): Promise<Metadata> => {
    const locale = await getLocale()
    const t = await getTranslations({
        locale,
        namespace: 'Metadata'
    })

    return {
        title: {
            default: t('title'),
            template: `%s | ${t('title')}`
        },
        description: t('description'),
        openGraph: {
            title: t('title'),
            description: t('description'),
            type: 'website',
            images: `${envConstant.NEXT_PUBLIC_NEXT_HOST}/icons/favicon-1024x1024.png`
        },
        icons: seoConstants.ICONS
    }
}

export default async function RootLayout({children}: PropsWithChildren) {
    const cookieStore = cookies()

    const locale = await getLocale()
    const messages = await getMessages({locale})

    const theme = cookieStore.get(cookieConstant.THEME)?.value || 'system'

    return (
        <html lang={locale} className={`w-full h-full ${theme}`}>
            <body className={`w-full h-full ${nunito.className} bg-content`}>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <TanStackQueryProvider>
                        <Toaster
                            theme={theme as any}
                            position='top-center'
                            duration={2000}
                        />

                        {children}
                    </TanStackQueryProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
