'use active'

import {PopUpMenuComponent} from '@/components/PopUpMenu/popup-menu.component'
import {useTranslations} from 'next-intl'
import styles from './pt-setting.module.css'
import {ListComponent} from '@/components/List/list.component'
import {ItemDefaultComponent} from '@/components/ItemList'
import {usePtSettings} from '@/hooks/usePtSettings.hook'

interface IProps {
    isOpen: boolean
    onClose: () => any
}

export const PtSettingsComponent = ({isOpen, onClose}: IProps) => {
    const t = useTranslations('Pomodoro.settings')

    const {ptSettings, isLoading} = usePtSettings()

    return (
        <PopUpMenuComponent
            className='flex flex-col gap-5 pb-20'
            title={t('title')}
            isOpen={isOpen}
            onClose={onClose}
            showDone={true}
        >
            {isLoading ? (
                <>
                    <ListComponent
                        title={t('work-time.title')}
                        description={t('work-time.description')}
                    >
                        <ItemDefaultComponent isLoading={true} />
                    </ListComponent>
                    <ListComponent title={t('break.title')}>
                        <ItemDefaultComponent isLoading={true} />
                        <ItemDefaultComponent isLoading={true} />
                    </ListComponent>
                    <ListComponent title={t('frequency.title')}>
                        <ItemDefaultComponent isLoading={true} />
                    </ListComponent>
                    <ListComponent title={t('session.title')}>
                        <ItemDefaultComponent isLoading={true} />
                    </ListComponent>
                </>
            ) : (
                <>
                    <ListComponent
                        title={t('work-time.title')}
                        description={t('work-time.description')}
                    >
                        <ItemDefaultComponent title={t('work-time.text')} />
                    </ListComponent>
                    <ListComponent title={t('break.title')}>
                        <ItemDefaultComponent
                            title={t('break.text-short-break')}
                        />
                        <ItemDefaultComponent
                            title={t('break.text-long-break')}
                        />
                    </ListComponent>
                    <ListComponent title={t('frequency.title')}>
                        <ItemDefaultComponent title={t('frequency.text')} />
                    </ListComponent>
                    <ListComponent title={t('session.title')}>
                        <ItemDefaultComponent title={t('session.text')} />
                    </ListComponent>
                </>
            )}
        </PopUpMenuComponent>
    )
}
