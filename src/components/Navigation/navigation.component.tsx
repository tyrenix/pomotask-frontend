'use client'

import {dashboardConstant} from '@/constants/dashboard.constant'
import {useActivePage} from '@/hooks/useActivePage.hook'
import {clsx} from 'clsx'
import {CircleUser, ListChecks, Timer} from 'lucide-react'
import {useTranslations} from 'next-intl'
import Link from 'next/link'
import styles from './navigation.module.css'

export const NavigationComponent = () => {
    const t = useTranslations('Pages')
    const activePage = useActivePage()

    return (
        <div className={styles.wrapper}>
            <Link
                href={dashboardConstant.APP_PAGE}
                className={styles.wrapperLogo}
            >
                <span>Pomo</span>task
            </Link>
            <ul className={styles.wrapperButtons}>
                <li
                    className={clsx(
                        activePage === 'tasks' && styles.activeButton
                    )}
                >
                    <Link href={dashboardConstant.TASKS_PAGE}>
                        <ListChecks />
                        <span>{t('tasks')}</span>
                    </Link>
                </li>
                <li
                    className={clsx(
                        activePage === 'pomodoro' && styles.activeButton
                    )}
                >
                    <Link href={dashboardConstant.POMODORO_PAGE}>
                        <Timer />
                        <span>{t('pomodoro')}</span>
                    </Link>
                </li>
                <li
                    className={clsx(
                        activePage === 'profile' && styles.activeButton
                    )}
                >
                    <Link href={dashboardConstant.PROFILE_PAGE}>
                        <CircleUser />
                        <span>{t('profile')}</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}
