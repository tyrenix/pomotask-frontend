'use client'

import {AlignEndVertical, AreaChart, Focus} from 'lucide-react'
import {useTranslations} from 'next-intl'
import {useRouter} from 'next/navigation'
import FillButtonComponent from '@/components/Button/fill-button.component'
import {dashboardConstant} from '@/constants/dashboard.constant'

import styles from './welcome.module.css'

export const WelcomeComponent = () => {
    const t = useTranslations('Welcome')
    const router = useRouter()

    return (
        <div className={styles.wrapper}>
            <h1>{t('content.title')}</h1>
            <p>{t('content.description')}</p>
            <ul>
                <li>
                    <Focus className='text-accent' />
                    <div>
                        <h3>{t('content.advantages.focus.title')}</h3>
                        <span>{t('content.advantages.focus.description')}</span>
                    </div>
                </li>
                <li>
                    <AlignEndVertical className='text-blue-500' />
                    <div>
                        <h3>{t('content.advantages.flexibility.title')}</h3>
                        <span>
                            {t('content.advantages.flexibility.description')}
                        </span>
                    </div>
                </li>
                <li>
                    <AreaChart className='text-green-700' />
                    <div>
                        <h3>{t('content.advantages.stats.title')}</h3>
                        <span>{t('content.advantages.stats.description')}</span>
                    </div>
                </li>
            </ul>
            <div className={styles.buttonWrapper}>
                <FillButtonComponent
                    label={t('content.next')}
                    onClick={() => router.replace(dashboardConstant.APP_PAGE)}
                />
            </div>
        </div>
    )
}
