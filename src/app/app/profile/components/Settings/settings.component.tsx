'use client'

import {useState} from 'react'
import {useTranslations} from 'next-intl'
import {PopUpMenuComponent} from '@/components/PopUpMenu/popup-menu.component'
import {
    ItemTransitionComponent,
    ItemSessionComponent
} from '@/components/ItemList'
import {ListComponent} from '@/components/List/list.component'
import {useSessions} from '@/hooks/useSessions.hook'
import {SessionInfoComponent} from '../SessionInfo/session-info.component'
import {PasswordComponent} from '../Password/password.component'
import {PtSettingsComponent} from '@/app/app/components/PtSettings/pt-settings.component'

interface IProps {
    isOpen: boolean
    onClose: () => any
}

export const ProfileSettingsComponent = ({isOpen, onClose}: IProps) => {
    const t = useTranslations('Settings')

    const [openSessionPopUp, setOpenSessionPopUp] = useState<string | null>(
        null
    )
    const [isOpenPtSettings, setIsOpenPtSettings] = useState<boolean>(false)

    const [isOpenPasswordPopUp, setIsOpenPasswordPopUp] =
        useState<boolean>(false)

    const {
        sessions,
        isLoading: isLoadingSessions,
        isSuccess: isSuccessSessions
    } = useSessions()

    return (
        <>
            <PopUpMenuComponent
                className='flex flex-col gap-4 pb-20'
                isOpen={isOpen}
                onClose={onClose}
                title={t('title')}
            >
                <ListComponent title={t('password.title')}>
                    <ItemTransitionComponent
                        title={t('password.text')}
                        onClick={() => setIsOpenPasswordPopUp(true)}
                    />
                </ListComponent>
                <ListComponent title={t('pomodoro.title')}>
                    <ItemTransitionComponent
                        title={t('pomodoro.text')}
                        onClick={() => setIsOpenPtSettings(true)}
                    />
                </ListComponent>
                {!sessions || isLoadingSessions || !isSuccessSessions ? (
                    <ListComponent
                        title={t('sessions.title')}
                        description={t('sessions.description')}
                    >
                        <ItemSessionComponent isLoading={true} />
                        <ItemSessionComponent isLoading={true} />
                        <ItemSessionComponent isLoading={true} />
                    </ListComponent>
                ) : (
                    <ListComponent
                        title={t('sessions.title')}
                        description={t('sessions.description')}
                    >
                        {Object.keys(sessions).map(sessionKey => (
                            <ItemSessionComponent
                                key={sessionKey}
                                session={sessions[sessionKey]}
                                onClick={() => setOpenSessionPopUp(sessionKey)}
                            />
                        ))}
                    </ListComponent>
                )}
            </PopUpMenuComponent>
            <SessionInfoComponent
                isOpen={!!openSessionPopUp}
                sessionId={openSessionPopUp || ''}
                onClose={() => setOpenSessionPopUp(null)}
            />
            <PasswordComponent
                isOpen={isOpenPasswordPopUp}
                onClose={() => setIsOpenPasswordPopUp(false)}
            />
            <PtSettingsComponent
                isOpen={isOpenPtSettings}
                onClose={() => setIsOpenPtSettings(false)}
            />
        </>
    )
}
