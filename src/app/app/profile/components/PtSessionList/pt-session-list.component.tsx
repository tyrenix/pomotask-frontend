'use client'

import {useTranslations} from 'next-intl'

import {ItemPtSessionComponent} from '@/components/ItemList'
import {ListComponent} from '@/components/List/list.component'
import {PopUpMenuComponent} from '@/components/PopUpMenu/popup-menu.component'
import {usePtSessions} from '@/hooks/usePtSessions.hook'
import {useState} from 'react'
import {PtSessionInfoComponent} from '../PtSessionInfo/pt-session-info.component'

interface IProps {
    isOpen: boolean
    onClose: () => any
}

export const PtSessionListComponent = ({isOpen, onClose}: IProps) => {
    const t = useTranslations('Profile.pomodoro-sessions')

    const [openPtSession, setOpenPtSession] = useState<string | null>(null)

    const {ptSessions, isLoading} = usePtSessions({
        filters: {isCompleted: true},
        enabled: isOpen
    })

    return (
        <>
            <PopUpMenuComponent
                isOpen={isOpen}
                onClose={onClose}
                title={t('title')}
            >
                {!ptSessions || isLoading ? (
                    <ListComponent>
                        <ItemPtSessionComponent isLoading={true} />
                        <ItemPtSessionComponent isLoading={true} />
                        <ItemPtSessionComponent isLoading={true} />
                        <ItemPtSessionComponent isLoading={true} />
                        <ItemPtSessionComponent isLoading={true} />
                        <ItemPtSessionComponent isLoading={true} />
                    </ListComponent>
                ) : (
                    <ListComponent>
                        {ptSessions.map(ptSession => (
                            <ItemPtSessionComponent
                                key={ptSession.id}
                                ptSession={ptSession}
                                onClick={() => setOpenPtSession(ptSession.id)}
                            />
                        ))}
                    </ListComponent>
                )}
            </PopUpMenuComponent>
            <PtSessionInfoComponent
                isOpen={!!openPtSession}
                onClose={() => setOpenPtSession(null)}
                ptSessionId={openPtSession || ''}
            />
        </>
    )
}
