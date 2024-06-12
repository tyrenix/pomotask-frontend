'use client'

import {ItemPtSessionComponent} from '@/components/ItemList'
import {ListComponent} from '@/components/List/list.component'
import {PopUpMenuComponent} from '@/components/PopUpMenu/popup-menu.component'
import {usePtSessions} from '@/hooks/usePtSessions.hook'
import {useTranslations} from 'next-intl'
import React, {useEffect, useState} from 'react'
import {useInView} from 'react-intersection-observer'
import {PtSessionInfoComponent} from '../PtSessionInfo/pt-session-info.component'

interface IProps {
    isOpen: boolean
    onClose: () => any
    taskId?: string
}

export const PtSessionListComponent = ({isOpen, onClose, taskId}: IProps) => {
    const t = useTranslations('Profile.pomodoro-sessions')

    const [openPtSession, setOpenPtSession] = useState<string | null>(null)

    const {ref, inView} = useInView({threshold: 0.5})

    const {ptSessions, isLoading, fetchNextPage} = usePtSessions({
        filters: {isCompleted: true, taskId},
        enabled: isOpen
    })

    useEffect(() => {
        if (inView) {
            fetchNextPage()
        }
    }, [inView, fetchNextPage])

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
                        {ptSessions.pages.map((page, pageIndex) => (
                            <React.Fragment key={pageIndex}>
                                {page.map((ptSession, index) => (
                                    <React.Fragment key={ptSession.id}>
                                        <ItemPtSessionComponent
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
                                    </React.Fragment>
                                ))}
                            </React.Fragment>
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
