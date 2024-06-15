'use client'

import {PtSettingsComponent} from '@/app/app/components/PtSettings/pt-settings.component'
import {
    ItemDefaultComponent,
    ItemSessionComponent,
    ItemTransitionComponent
} from '@/components/ItemList'
import {ListComponent} from '@/components/List/list.component'
import {PopUpMenuComponent} from '@/components/PopUpMenu/popup-menu.component'
import {useSessions} from '@/hooks/useSessions.hook'
import {useTranslations} from 'next-intl'
import {useState} from 'react'
import {PasswordComponent} from '../Password/password.component'
import {SessionInfoComponent} from '../SessionInfo/session-info.component'
import {useLogout} from '@/hooks/useLogOut.hook'
import LoaderComponent from '@/components/Loader/loader.component'
import {
    DialogComponent,
    IDialogData
} from '@/components/Dialog/dialog.component'
import {useSessionCloseAll} from '@/hooks/useSessionCloseAll.hook'
import {SettingsLanguageComponent} from '../settings-language.component'

interface IProps {
    isOpen: boolean
    onClose: () => any
}

export const ProfileSettingsComponent = ({isOpen, onClose}: IProps) => {
    const t = useTranslations('Settings')

    const [openSessionPopUp, setOpenSessionPopUp] = useState<string | null>(
        null
    )
    const [isOpenLanguageSettings, setIsOpenLanguageSettings] =
        useState<boolean>(false)
    const [isOpenPtSettings, setIsOpenPtSettings] = useState<boolean>(false)
    const [dialog, setDialog] = useState<IDialogData | null>(null)

    const [isOpenPasswordPopUp, setIsOpenPasswordPopUp] =
        useState<boolean>(false)
    const logout = useLogout()
    const sessionsCloseAll = useSessionCloseAll()

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
                <ListComponent>
                    <ItemTransitionComponent
                        title={t('language.title')}
                        onClick={() => setIsOpenLanguageSettings(true)}
                    />
                    <ItemTransitionComponent />
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
                        <ItemDefaultComponent
                            classNameText='text-red-600'
                            size='small'
                            onClick={() =>
                                setDialog({
                                    title: t('sessions.close-all.ask.title'),
                                    description: t(
                                        'sessions.close-all.ask.description'
                                    ),
                                    button: t('sessions.close-all.ask.button'),
                                    onClick: sessionsCloseAll.mutate
                                })
                            }
                            title={t('sessions.close-all.text')}
                        />
                    </ListComponent>
                )}
                <ListComponent>
                    <ItemDefaultComponent
                        classNameText='text-red-600'
                        size='big'
                        onClick={() =>
                            setDialog({
                                title: t('logout.ask.title'),
                                description: t('logout.ask.description'),
                                button: t('logout.ask.button'),
                                onClick: logout.mutate
                            })
                        }
                        title={t('logout.text')}
                    />
                </ListComponent>
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
            <DialogComponent
                dialog={dialog}
                onClose={() => setDialog(null)}
                isOpen={!!dialog}
            />
            <SettingsLanguageComponent
                isOpen={isOpenLanguageSettings}
                onClose={() => setIsOpenLanguageSettings(false)}
            />
        </>
    )
}
