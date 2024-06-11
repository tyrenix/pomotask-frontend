import {Metadata} from 'next'
import {PropsWithChildren} from 'react'
import {HeaderComponent} from '@/components/Header/header.component'
import {NavigationComponent} from '@/components/Navigation/navigation.component'
import {seoConstants} from '@/constants/seo.constant'
import {HeaderProvider} from './context/header.context'
import styles from './layout.module.css'
import '@/styles/app.styles.css'

export const metadata: Metadata = {
    ...seoConstants.NO_INDEX_PAGE
}

export default function AppLayout({children}: PropsWithChildren) {
    return (
        <HeaderProvider>
            <div className={styles.wrapper}>
                <main className={styles.main}>
                    <div className={styles.content}>
                        <HeaderComponent />
                        {children}
                    </div>
                    <NavigationComponent />
                </main>
            </div>
        </HeaderProvider>
    )
}
