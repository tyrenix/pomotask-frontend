'use client'

import FillButtonComponent from '@/components/Button/fill-button.component'
import {ItemDefaultComponent} from '@/components/ItemList'
import {ListComponent} from '@/components/List/list.component'
import {PopUpMenuComponent} from '@/components/PopUpMenu/popup-menu.component'
import {sessionService} from '@/services/session.service'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import clsx from 'clsx'
import DeviceDetector from 'device-detector-js'
import {
    Computer as ComputerIcon,
    ShieldQuestion as ShieldQuestionIcon,
    Smartphone as SmartphoneIcon
} from 'lucide-react'
import {useTranslations} from 'use-intl'
import {usePtSession} from '@/hooks/usePtSession.hook'
import {toast} from 'sonner'

import styles from './session-info.module.css'

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
    const t = useTranslations('Settings.sessions.info')

    const {session, isLoading} = usePtSession(ptSessionId)

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
                        isLoading || !session
                            ? 'skeletron-loader'
                            : styles.wrapperIconLoad
                    )}
                >
                    {!session || isLoading ? null : agent === 'desktop' ? (
                        <ComputerIcon />
                    ) : agent === 'smartphone' ? (
                        <SmartphoneIcon />
                    ) : (
                        <ShieldQuestionIcon />
                    )}
                </div>
                <div className={styles.wrapperInfo}>
                    <h4
                        className={clsx(
                            (isLoading || !session) && 'skeletron-loader'
                        )}
                    >
                        {deviceDetect.device?.brand} {deviceDetect.os?.name}{' '}
                        {deviceDetect.os?.version}
                    </h4>
                    <p
                        className={clsx(
                            (isLoading || !session) && 'skeletron-loader mt-2'
                        )}
                    >
                        {t('opened')}{' '}
                        {new Date(
                            (session?.createdAt || 0) * 1e3
                        ).toLocaleString('ru-RU', {
                            minute: '2-digit',
                            hour: '2-digit',
                            month: '2-digit',
                            day: '2-digit',
                            year: '2-digit'
                        })}
                    </p>
                </div>
            </div>
            {isLoading || !session ? (
                <ListComponent>
                    <ItemDefaultComponent size='medium' isLoading={true} />
                    <ItemDefaultComponent size='medium' isLoading={true} />
                    <ItemDefaultComponent size='medium' isLoading={true} />
                </ListComponent>
            ) : (
                <ListComponent>
                    <ItemDefaultComponent
                        size='medium'
                        title={t('client')}
                        rightComponent={
                            <div className={styles.infoText}>
                                {deviceDetect.client?.name}{' '}
                                {deviceDetect.client?.version}{' '}
                            </div>
                        }
                    />
                    <ItemDefaultComponent
                        size='medium'
                        title={t('device')}
                        rightComponent={
                            <div className={styles.infoText}>
                                {deviceDetect.device?.brand}{' '}
                                {deviceDetect.os?.name}{' '}
                                {deviceDetect.os?.version}
                            </div>
                        }
                    />
                    <ItemDefaultComponent
                        size='medium'
                        title={t('ip')}
                        rightComponent={
                            <div className={styles.infoText}>{session?.ip}</div>
                        }
                    />
                </ListComponent>
            )}
            <FillButtonComponent
                label={t('close')}
                onClick={closeSession}
                loading={isLoading || !session}
            />
        </PopUpMenuComponent>
    )
}
