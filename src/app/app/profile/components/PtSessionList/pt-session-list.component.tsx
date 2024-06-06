'use client'

import {useTranslations} from 'next-intl'

import {PopUpMenuComponent} from '@/components/PopUpMenu/popup-menu.component'
import {ItemPtSessionComponent} from '@/components/ItemList'
import {usePtSessions} from '@/hooks/usePtSessions.hook'
import {ListComponent} from '@/components/List/list.component'
import {PtSessionInfoComponent} from '../PtSessionInfo/pt-session-info.component'

interface IProps {
    isOpen: boolean
    onClose: () => any
}

export const PtSessionListComponent = ({isOpen, onClose}: IProps) => {
    const t = useTranslations('Profile.pomodoro-sessions')

    const {ptSessions, isLoading} = usePtSessions({isCompleted: true})

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
                            />
                        ))}
                    </ListComponent>
                )}
            </PopUpMenuComponent>
            <PtSessionInfoComponent
                isOpen={true}
                onClose={() => {}}
                ptSessionId=''
            />
        </>
    )
}
