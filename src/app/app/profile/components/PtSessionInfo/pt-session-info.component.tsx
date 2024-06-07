'use client'

import {
    ItemDefaultComponent,
    ItemTransitionComponent
} from '@/components/ItemList'
import {ListComponent} from '@/components/List/list.component'
import {PopUpMenuComponent} from '@/components/PopUpMenu/popup-menu.component'
import {usePtSession} from '@/hooks/usePtSession.hook'
import clsx from 'clsx'
import {useTranslations} from 'use-intl'

import styles from './pt-session-info.module.css'
import {useTask} from '@/hooks/useTask.hook'

const toLocaleStringConfig: Intl.DateTimeFormatOptions = {
    minute: '2-digit',
    hour: '2-digit',
    month: '2-digit',
    day: '2-digit',
    year: '2-digit'
}

interface IProps {
    ptSessionId: string
    isOpen: boolean
    onClose: () => any
}

export const PtSessionInfoComponent = ({
    ptSessionId,
    isOpen,
    onClose
}: IProps) => {
    const tUnits = useTranslations('Units')
    const t = useTranslations('PtSession')

    const {ptSession, isLoading} = usePtSession(ptSessionId)
    const {task, isLoading: isLoadingTask} = useTask(ptSession?.taskId || '')

    return (
        <PopUpMenuComponent
            className='flex flex-col gap-6 pb-standard'
            isOpen={isOpen}
            onClose={onClose}
            type='small'
            title={t('info.title')}
        >
            <div className={styles.wrapperMainInfo}>
                <div
                    className={clsx(
                        styles.wrapperIcon,
                        isLoading || !ptSession
                            ? 'skeletron-loader'
                            : ptSession.type === 'work'
                            ? 'bg-accent'
                            : ptSession.type === 'longBreak'
                            ? 'bg-blue'
                            : 'bg-green'
                    )}
                >
                    {!isLoading &&
                        ptSession &&
                        `${Math.floor(ptSession.totalSeconds / 60)}${tUnits(
                            'shortMinutes'
                        )}`}
                </div>
                <div className={styles.wrapperInfo}>
                    <h4
                        className={clsx(
                            (isLoading || !ptSession) && 'skeletron-loader'
                        )}
                    >
                        {ptSession?.type && t(ptSession?.type)}
                    </h4>
                    <p
                        className={clsx(
                            (isLoading || !ptSession) && 'skeletron-loader mt-2'
                        )}
                    >
                        {`${t('info.started')} ${new Date(
                            ptSession?.createdAt || 0
                        ).toLocaleDateString('ru-RU', toLocaleStringConfig)}`}
                    </p>
                </div>
            </div>
            {isLoading || !ptSession ? (
                <ListComponent>
                    <ItemDefaultComponent size='medium' isLoading={true} />
                    <ItemDefaultComponent size='medium' isLoading={true} />
                </ListComponent>
            ) : (
                <ListComponent>
                    <ItemDefaultComponent
                        size='medium'
                        title={t('info.started')}
                        rightComponent={
                            <div className={styles.infoText}>
                                {new Date(
                                    ptSession.createdAt
                                ).toLocaleDateString(
                                    'ru-RU',
                                    toLocaleStringConfig
                                )}
                            </div>
                        }
                    />
                    <ItemDefaultComponent
                        size='medium'
                        title={t('info.ended')}
                        rightComponent={
                            <div className={styles.infoText}>
                                {new Date(
                                    new Date(ptSession.createdAt).getTime() +
                                        ptSession.totalSeconds * 1e3
                                ).toLocaleDateString(
                                    'ru-RU',
                                    toLocaleStringConfig
                                )}
                            </div>
                        }
                    />
                </ListComponent>
            )}
            {isLoadingTask ? (
                <ListComponent title={t('info.task')}>
                    <ItemTransitionComponent isLoading={true} />
                </ListComponent>
            ) : task ? (
                <ListComponent title={t('info.task')}>
                    <ItemTransitionComponent title={task.title} />
                </ListComponent>
            ) : null}
        </PopUpMenuComponent>
    )
}
