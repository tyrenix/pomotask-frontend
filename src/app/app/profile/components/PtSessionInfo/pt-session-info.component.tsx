'use client'

import FillButtonComponent from '@/components/Button/fill-button.component'
import {ItemDefaultComponent} from '@/components/ItemList'
import {ListComponent} from '@/components/List/list.component'
import {PopUpMenuComponent} from '@/components/PopUpMenu/popup-menu.component'
import {usePtSession} from '@/hooks/usePtSession.hook'
import clsx from 'clsx'
import {useTranslations} from 'use-intl'

import styles from './pt-session-info.module.css'

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
    const t = useTranslations('Settings.pomodoro-sessions.info')

    const {ptSession, isLoading} = usePtSession(ptSessionId)

    return (
        <PopUpMenuComponent
            className='flex flex-col gap-6 pb-standard'
            isOpen={isOpen}
            onClose={onClose}
            type='small'
            title={t('title')}
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
                    ></h4>
                    <p
                        className={clsx(
                            (isLoading || !ptSession) && 'skeletron-loader mt-2'
                        )}
                    >
                        {/* {new Date(
                            (session?.createdAt || 0) * 1e3
                        ).toLocaleString('ru-RU', {
                            minute: '2-digit',
                            hour: '2-digit',
                            month: '2-digit',
                            day: '2-digit',
                            year: '2-digit'
                        })} */}
                    </p>
                </div>
            </div>
            {isLoading || !ptSession ? (
                <ListComponent>
                    <ItemDefaultComponent size='medium' isLoading={true} />
                    <ItemDefaultComponent size='medium' isLoading={true} />
                    <ItemDefaultComponent size='medium' isLoading={true} />
                </ListComponent>
            ) : (
                <ListComponent>
                    <ItemDefaultComponent
                        size='medium'
                        title={t('started')}
                        rightComponent={<div className={styles.infoText}></div>}
                    />
                </ListComponent>
            )}
        </PopUpMenuComponent>
    )
}
