import {clsx} from 'clsx'
import {useTranslations} from 'next-intl'

import styles from './activity.module.css'

const getHoursAndMinutes = (
    seconds: number
): {hours: number; minutes: number} => {
    const hours = Math.floor(seconds / 60 / 60)
    const minutes = Math.floor((seconds - hours * 60 * 60) / 60)

    return {
        hours,
        minutes
    }
}

interface IProps {
    completedSeconds: number
    totalSeconds: number
    title: string
    isLoading?: boolean
}

export const ActivityComponent = ({
    completedSeconds,
    totalSeconds,
    title,
    isLoading
}: IProps) => {
    const t = useTranslations('Units')

    const completedTime = getHoursAndMinutes(completedSeconds)
    const totalTime = getHoursAndMinutes(totalSeconds)

    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapperTitle}>
                <p className={clsx(isLoading && 'skeletron-loader')}>{title}</p>
            </div>
            <div
                className={clsx(
                    isLoading
                        ? styles.wrapperProgressLoading
                        : styles.wrapperProgress,
                    isLoading && 'skeletron-loader'
                )}
            >
                {!isLoading && (
                    <>
                        <div
                            style={{
                                width: `${Math.floor((completedSeconds / totalSeconds) * 100)}%`
                            }}
                        />
                        <p>
                            {completedTime.hours
                                ? `${completedTime.hours}${t('shortHours')} ${completedTime.minutes}${t('shortMinutes')}`
                                : `${completedTime.minutes}${t('shortMinutes')}`}{' '}
                            /{' '}
                            {totalTime.hours
                                ? `${totalTime.hours}${t('shortHours')} ${totalTime.minutes}${t('shortMinutes')}`
                                : `${totalTime.minutes}${t('shortMinutes')}`}
                        </p>
                    </>
                )}
            </div>
        </div>
    )
}
