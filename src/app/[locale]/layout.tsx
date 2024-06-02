import type {Metadata, Viewport} from 'next'
import {PropsWithChildren} from 'react'
import {Nunito} from 'next/font/google'
import {NextIntlClientProvider} from 'next-intl'
import {getMessages, getTranslations} from 'next-intl/server'
import {cookies} from 'next/headers'
import '../globals.css'
import '../theme.css'

const nunito = Nunito({subsets: ['latin', 'cyrillic']})

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 1
}

export const generateMetadata = async ({
    params
}: {
    params: {locale: string}
}): Promise<Metadata> => {
    const t = await getTranslations({
        locale: params.locale,
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
            images: `${process.env.NEXT_HOST || ''}/icons/favicon-1024x1024.png`
        },
        icons: {
            icon: [
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '16x16',
                    url: '/icons/favicon-16x16.png'
                },
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '32x32',
                    url: '/icons/favicon-32x32.png'
                },
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '192x192',
                    url: '/icons/favicon-192x192.png'
                },
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '512x512',
                    url: '/icons/favicon-512x512.png'
                },
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '1024x1024',
                    url: '/icons/favicon-1024x1024.png'
                },
                {
                    rel: 'apple-touch-icon',
                    type: 'image/png',
                    sizes: '180x180',
                    url: '/icons/favicon-180x180.png'
                }
            ],
            other: [
                {rel: 'icon', type: 'image/svg+xml', url: '/icons/favicon.svg'}
            ]
        }
    }
}

interface IProps extends PropsWithChildren {
    params: {locale: string}
}

export default async function RootLayout({children, params}: IProps) {
    const cookieStore = cookies()
    const messages = await getMessages()

    return (
        <html
            lang={params.locale}
            className={`w-full h-full ${cookieStore.get('theme')?.value || 'system'}`}
        >
            <body className={`w-full h-full ${nunito.className} bg-content`}>
                <NextIntlClientProvider messages={messages}>
                    <main className='w-full h-full p-standard text-primaryInvert'>
                        {children}
                    </main>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
