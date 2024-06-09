'use client'

import {clsx} from 'clsx'
import {useTranslations} from 'next-intl'
import {
    ItemDefaultComponent,
    IProps as ItemDefaultProps
} from '@/components/ItemList'
import {IPomodoroSession} from '@/types/pomodoro-session.types'

import styles from './item-pt-session.module.css'

interface IPropsWithoutLoading extends Pick<ItemDefaultProps, 'onClick'> {
    ptSession: IPomodoroSession
    isLoading?: false
}

interface IPropsWithLoading
    extends Partial<Omit<IPropsWithoutLoading, 'isLoading'>> {
    isLoading: true
}

type IProps = IPropsWithLoading | IPropsWithoutLoading

export const ItemPtSessionComponent = ({
    ptSession,
    isLoading,
    ...rest
}: IProps) => {
    const t = useTranslations('Units')
    const tPtSession = useTranslations('PtSession')

    const completedMinutes = Math.floor((ptSession?.completedSeconds || 0) / 60)

    const icon = (
        <div
            className={clsx(
                isLoading ? styles.wrapperIconLoading : styles.wrapperIcon,
                isLoading && 'skeletron-loader',
                !isLoading &&
                    (ptSession.type === 'work'
                        ? 'bg-accent'
                        : ptSession.type === 'longBreak'
                        ? 'bg-blue'
                        : 'bg-green')
            )}
        >
            {completedMinutes}
            {t('shortMinutes')[0]}
        </div>
    )

    return (
        <ItemDefaultComponent
            size='big'
            title={ptSession?.type && tPtSession(ptSession.type)}
            description={new Date(ptSession?.createdAt || 0).toLocaleDateString(
                'ru-RU',
                {
                    day: '2-digit',
                    month: '2-digit',
                    minute: '2-digit',
                    hour: '2-digit'
                }
            )}
            leftComponent={icon}
            isLoading={isLoading}
            {...rest}
        />
    )
}
