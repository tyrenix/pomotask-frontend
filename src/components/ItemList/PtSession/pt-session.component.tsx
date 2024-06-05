import {useTranslations} from 'next-intl'
import {clsx} from 'clsx'
import {
    IProps as ItemDefaultProps,
    ItemDefaultComponent
} from '@/components/ItemList'
import {TPomodoroSession} from '@/types/pomodoro-session.types'

import styles from './pt-session.module.css'

interface IPropsWithoutLoading
    extends Pick<ItemDefaultProps, 'onClick' | 'description' | 'title'> {
    type: TPomodoroSession
    totalSeconds: number
    isLoading?: false
}

interface IPropsWithLoading
    extends Partial<Omit<IPropsWithoutLoading, 'isLoading'>> {
    isLoading: true
}

type IProps = IPropsWithLoading | IPropsWithoutLoading

export const PtSessionComponent = ({
    type,
    totalSeconds,
    isLoading,
    ...rest
}: IProps) => {
    const t = useTranslations('Units')
    const totalMinutes = Math.floor((totalSeconds || 0) / 60)
    const icon = (
        <div
            className={clsx(
                isLoading ? styles.wrapperIconLoading : styles.wrapperIcon,
                isLoading && 'skeletron-loader',
                !isLoading &&
                    (type === 'work'
                        ? 'bg-accent'
                        : type === 'longBreak'
                        ? 'bg-blue'
                        : 'bg-green')
            )}
        >
            {totalMinutes}
            {t('shortMinutes')[0]}
        </div>
    )

    return (
        <ItemDefaultComponent
            size='big'
            leftComponent={icon}
            isLoading={isLoading}
            {...rest}
        />
    )
}
