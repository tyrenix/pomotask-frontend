'use client'

import {useTranslations} from 'next-intl'
import {ListComponent} from '@/components/List/list.component'
import {ActivityComponent} from '@/components/Activity/activity.component'
import * as ItemList from '@/components/ItemList'

export const ProfileComponent = () => {
    const t = useTranslations('Profile')

    return (
        <>
            <ListComponent>
                <ItemList.ItemAvatarComponent isLoading={true} />
                <ItemList.ItemTransitionComponent
                    size='small'
                    isLoading={true}
                />
            </ListComponent>
            <ListComponent title={t('activity')}>
                <div className='flex flex-col p-standard gap-4'>
                    <ActivityComponent
                        title={t('activity.today')}
                        completedSeconds={12000}
                        totalSeconds={19000}
                        isLoading={true}
                    />
                    <ActivityComponent
                        title={t('activity.month')}
                        completedSeconds={12000}
                        totalSeconds={19000}
                        isLoading={true}
                    />
                </div>
            </ListComponent>
            <ListComponent title={t('pomodoro-sessions')}>
                <ItemList.PtSessionComponent
                    type='work'
                    title='Work'
                    description='Started on 19'
                    totalSeconds={300}
                    isLoading={true}
                />
            </ListComponent>
        </>
    )
}
