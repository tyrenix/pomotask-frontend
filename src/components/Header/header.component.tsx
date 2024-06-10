'use client'

import {useActivePage} from '@/hooks/useActivePage.hook'
import {BoltIcon} from 'lucide-react'
import {useTranslations} from 'next-intl'
import styles from './header.module.css'
import {useHeaderContext} from '@/app/app/context/header.context'

export const HeaderComponent = () => {
    const t = useTranslations('Pages')

    const {handleClick} = useHeaderContext()
    const activePage = useActivePage()

    const showOptions = activePage === 'pomodoro'

    return (
        <header className={styles.wrapper}>
            <h1>{t(activePage)}</h1>
            {showOptions && (
                <button className={styles.wrapperOptions} onClick={handleClick}>
                    <BoltIcon />
                </button>
            )}
        </header>
    )
}
