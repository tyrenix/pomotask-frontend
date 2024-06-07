'use client'

import {useTranslations} from 'next-intl'
import {ItemPtSessionComponent} from '@/components/ItemList'
import {ListComponent} from '@/components/List/list.component'
import {PopUpMenuComponent} from '@/components/PopUpMenu/popup-menu.component'
import {usePtSessions} from '@/hooks/usePtSessions.hook'
import {useEffect, useState} from 'react'
import {useInView} from 'react-intersection-observer'
import {PtSessionInfoComponent} from '../PtSessionInfo/pt-session-info.component'

interface IProps {
    isOpen: boolean
    onClose: () => any
}

export const PtSessionListComponent = ({isOpen, onClose}: IProps) => {
    const t = useTranslations('Profile.pomodoro-sessions')

    const [openPtSession, setOpenPtSession] = useState<string | null>(null)

    const {ref, inView} = useInView({threshold: 0.5})

    const {ptSessions, isLoading, fetchNextPage} = usePtSessions({
        filters: {isCompleted: true},
        enabled: isOpen
    })

    useEffect(() => {
        if (inView) {
            fetchNextPage()
        }
    }, [inView])

    return (
        <>
            <PopUpMenuComponent
                className='pb-20'
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
                        {ptSessions.pages.map((page, pageIndex) =>
                            page.map((ptSession, index) => (
                                <>
                                    <ItemPtSessionComponent
                                        key={ptSession.id}
                                        ptSession={ptSession}
                                        onClick={() =>
                                            setOpenPtSession(ptSession.id)
                                        }
                                    />
                                    {ptSessions.pages.length - 1 ===
                                        pageIndex &&
                                    page.length - 3 === index ? (
                                        <div
                                            ref={ref}
                                            className='w-full h-0 overflow-hidden'
                                        />
                                    ) : null}
                                </>
                            ))
                        )}
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
