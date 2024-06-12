import {clsx} from 'clsx'
import {useTranslations} from 'next-intl'
import {getHoursAndMinutes} from '@/helpers/get-hours-and-minutes.helper'

import styles from './activity.module.css'

interface IPropsWithoutLoading {
    completedSeconds: number
    totalSeconds: number
    title: string
    isLoading?: false
}

interface IPropsWitLoading
    extends Omit<Partial<IPropsWithoutLoading>, 'isLoading'> {
    isLoading: true
}

type IProps = IPropsWitLoading | IPropsWithoutLoading

export const ActivityComponent = ({
    completedSeconds,
    totalSeconds,
    title,
    isLoading
}: IProps) => {
    const t = useTranslations('Units')

    const options = {
        mins: t('shortMinutes'),
        hours: t('shortHours')
    }

    const completedTime = getHoursAndMinutes(completedSeconds || 0, options)
    const totalTime = getHoursAndMinutes(totalSeconds || 0, options)

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
                                width: `${Math.floor(
                                    (completedSeconds / totalSeconds) * 100
                                )}%`
                            }}
                        />
                        <p>{`${completedTime.string} / ${totalTime.string}`}</p>
                    </>
                )}
            </div>
        </div>
    )
}
