'use client'

import {useState} from 'react'
import {useTranslations} from 'next-intl'
import {PopUpMenuComponent} from '@/components/PopUpMenu/popup-menu.component'
import {
    ItemTransitionComponent,
    ItemSessionComponent
} from '@/components/ItemList'
import {ListComponent} from '@/components/List/list.component'

interface IProps {
    isOpen: boolean
    onClose: () => any
}

export const ProfileSettingsComponent = ({isOpen, onClose}: IProps) => {
    const t = useTranslations('Settings')

    const [isOpenPasswordPopUp, setIsOpenPasswordPopUp] =
        useState<boolean>(false)

    return (
        <PopUpMenuComponent
            className='flex flex-col gap-4'
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
                <ItemTransitionComponent title={t('pomodoro.text')} />
            </ListComponent>
            <ListComponent
                title={t('sessions.title')}
                description={t('sessions.description')}
            >
                <ItemSessionComponent
                    type='pc'
                    title='192.168.1.1'
                    description='Local host'
                />
                <ItemSessionComponent
                    type='phone'
                    title='192.168.1.1'
                    description='Local host'
                />
                <ItemSessionComponent
                    type='pc'
                    title='192.168.1.1'
                    description='Local host'
                />
            </ListComponent>
        </PopUpMenuComponent>
    )
}
