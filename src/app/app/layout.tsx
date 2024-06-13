import {Metadata, Viewport} from 'next'
import {PropsWithChildren} from 'react'
import {HeaderComponent} from '@/components/Header/header.component'
import {NavigationComponent} from '@/components/Navigation/navigation.component'
import {seoConstants} from '@/constants/seo.constant'
import {HeaderProvider} from './context/header.context'
import styles from './layout.module.css'
import '@/styles/app.styles.css'
import {SoundProvider} from './context/sound.context'
import {cookies} from 'next/headers'
import {cookieConstant} from '@/constants/cookie.constant'

export const metadata: Metadata = {
    ...seoConstants.NO_INDEX_PAGE
}

export const generateViewport = ({}): Viewport => {
    const cookieStore = cookies()
    const theme = cookieStore.get(cookieConstant.THEME)?.value || 'system'

    return {
        themeColor:
            theme === 'dark'
                ? '#0b0b0b'
                : theme === 'light'
                ? '#F4F4F4'
                : [
                      {
                          media: '(prefers-color-scheme: light)',
                          color: '#F4F4F4'
                      },
                      {media: '(prefers-color-scheme: dark)', color: '#0b0b0b'}
                  ]
    }
}

export default function AppLayout({children}: PropsWithChildren) {
    return (
        <HeaderProvider>
            <SoundProvider>
                <div className={styles.wrapper}>
                    <main className={styles.main}>
                        <div className={styles.content}>
                            <HeaderComponent />
                            {children}
                        </div>
                        <NavigationComponent />
                    </main>
                </div>
            </SoundProvider>
        </HeaderProvider>
    )
}
