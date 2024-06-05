'use client'

import {useTranslations} from 'next-intl'
import {EllipsisVertical} from 'lucide-react'
import {useActivePage} from '@/hooks/useActivePage.hook'

import styles from './header.module.css'

export const HeaderComponent = () => {
    const t = useTranslations('Pages')
    const activePage = useActivePage()

    const showOptions = false

    return (
        <header className={styles.wrapper}>
            <h1>{t(activePage)}</h1>
            {showOptions && (
                <div className={styles.wrapperOptions}>
                    <EllipsisVertical />
                </div>
            )}
        </header>
    )
}
