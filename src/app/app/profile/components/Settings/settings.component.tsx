'use client'

import {PopUpMenuFullComponent} from '@/components/PopUpMenu/Full/menu-full.component'
import {ItemAvatarComponent, PtSessionComponent} from '@/components/ItemList'

interface IProps {
    isOpen: boolean
    onClose: () => any
}

export const ProfileSettingsComponent = ({isOpen, onClose}: IProps) => {
    return (
        <PopUpMenuFullComponent isOpen={isOpen} onClose={onClose}>
            <ItemAvatarComponent isLoading={true} />
            <ItemAvatarComponent isLoading={true} />
            <ItemAvatarComponent isLoading={true} />
            <PtSessionComponent isLoading={true} />
            <PtSessionComponent isLoading={true} />
            <PtSessionComponent isLoading={true} />
            <PtSessionComponent isLoading={true} />
            <PtSessionComponent isLoading={true} />
            <PtSessionComponent isLoading={true} />
            <PtSessionComponent isLoading={true} />
            <PtSessionComponent isLoading={true} />
            <PtSessionComponent isLoading={true} />
            <PtSessionComponent isLoading={true} />
            <PtSessionComponent isLoading={true} />
        </PopUpMenuFullComponent>
    )
}
