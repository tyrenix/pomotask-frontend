'use client'

import FillButtonComponent from '@/components/Button/fill-button.component'
import {ItemDefaultComponent} from '@/components/ItemList'
import {ListComponent} from '@/components/List/list.component'
import {PopUpMenuComponent} from '@/components/PopUpMenu/popup-menu.component'
import {useSession} from '@/hooks/useSession.hook'
import {sessionService} from '@/services/session.service'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import clsx from 'clsx'
import DeviceDetector from 'device-detector-js'
import {LaptopIcon, ShieldQuestionIcon, SmartphoneIcon} from 'lucide-react'
import {toast} from 'sonner'
import {useTranslations} from 'use-intl'

import {
    DialogComponent,
    IDialogData
} from '@/components/Dialog/dialog.component'
import {useState} from 'react'
import styles from './session-info.module.css'

interface IProps {
    sessionId: string
    isOpen: boolean
    onClose: () => any
}

export const SessionInfoComponent = ({sessionId, isOpen, onClose}: IProps) => {
    const queryClient = useQueryClient()

    const t = useTranslations('Settings.sessions.info')

    const [dialog, setDialog] = useState<IDialogData | null>(null)
    const {session, isLoading} = useSession(sessionId)

    const deviceDetect = new DeviceDetector().parse(session?.userAgent || '')
    const agent = deviceDetect.device?.type

    const {mutate} = useMutation({
        mutationKey: ['session-close', 'all'],
        mutationFn: (sessionId: string) =>
            sessionService.closeSession(sessionId),
        onSuccess: () => {
            toast.success(t('sessionClosed'))
            queryClient.invalidateQueries({queryKey: ['sessions']})
        },
        onError: error => {
            toast.error(t('sessionCloseError'))
        }
    })

    const closeSession = () => {
        onClose()
        mutate(sessionId)
    }

    return (
        <>
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
                            <LaptopIcon />
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
                                (isLoading || !session) &&
                                    'skeletron-loader mt-2'
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
                                <div className={styles.infoText}>
                                    {session?.ip}
                                </div>
                            }
                        />
                    </ListComponent>
                )}
                <FillButtonComponent
                    label={t('close')}
                    onClick={() =>
                        setDialog({
                            title: t('ask.title'),
                            description: t('ask.description'),
                            button: t('ask.button'),
                            onClick: closeSession
                        })
                    }
                    loading={isLoading || !session}
                />
            </PopUpMenuComponent>
            <DialogComponent
                dialog={dialog}
                isOpen={!!dialog}
                onClose={() => setDialog(null)}
            />
        </>
    )
}
