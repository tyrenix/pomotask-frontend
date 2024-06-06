'use client'

import {useState} from 'react'
import {useTranslations} from 'next-intl'
import {ListComponent} from '@/components/List/list.component'
import {ActivityComponent} from '@/components/Activity/activity.component'
import {
    ItemAvatarComponent,
    ItemPtSessionComponent,
    ItemTransitionComponent
} from '@/components/ItemList'
import {useUser} from '@/hooks/useUser.hook'
import {useUserActivity} from '@/hooks/useUserActivity.hook'
import {envConstant} from '@/constants/env.constant'
import {getHoursAndMinutes} from '@/helpers/get-hours-and-minutes.helper'
import {usePtSettings} from '@/hooks/usePtSettings.hook'
import {usePtSessions} from '@/hooks/usePtSessions.hook'
import {ProfileSettingsComponent} from '../Settings/settings.component'

export const ProfileComponent = () => {
    const tUnit = useTranslations('Units')
    const t = useTranslations('Profile')

    const [isOpenSettings, setIsOpenSettings] = useState<boolean>(false)

    const {user, isLoading: isLoadingUser} = useUser()
    const {activity, isLoading: isLoadingUserActivity} = useUserActivity()
    const {ptSettings, isLoading: isLoadingPtSettings} = usePtSettings()
    const {ptSessions, isLoading: isLoadingPtSessions} = usePtSessions()

    return (
        <>
            {!user || isLoadingUser || isLoadingUserActivity ? (
                <ListComponent>
                    <ItemAvatarComponent isLoading={true} />
                    <ItemTransitionComponent size='medium' isLoading={true} />
                </ListComponent>
            ) : (
                <ListComponent>
                    <ItemAvatarComponent
                        avatar={`${envConstant.NEXT_PUBLIC_DOMAIN}/images/avatars/${user?.avatar}.webp`}
                        title={user?.email || ''}
                        description={
                            getHoursAndMinutes(activity?.total || 0, {
                                hours: tUnit('shortHours'),
                                mins: tUnit('shortMinutes')
                            }).string
                        }
                    />
                    <ItemTransitionComponent
                        title={t('settings')}
                        size='medium'
                        onClick={() => setIsOpenSettings(true)}
                    />
                </ListComponent>
            )}
            {!activity ||
            !ptSettings ||
            isLoadingUserActivity ||
            isLoadingPtSettings ? (
                <ListComponent title={t('activity.title')}>
                    <div className='flex flex-col p-standard gap-4'>
                        <ActivityComponent isLoading={true} />
                        <ActivityComponent isLoading={true} />
                    </div>
                </ListComponent>
            ) : (
                <ListComponent title={t('activity.title')}>
                    <div className='flex flex-col p-standard gap-4'>
                        <ActivityComponent
                            title={t('activity.today')}
                            completedSeconds={activity.today}
                            totalSeconds={ptSettings.workingTime}
                        />
                        <ActivityComponent
                            title={t('activity.week')}
                            completedSeconds={activity.week}
                            totalSeconds={ptSettings.workingTime * 7}
                        />
                    </div>
                </ListComponent>
            )}
            {!ptSessions || isLoadingPtSessions ? (
                <ListComponent title={t('pomodoro-sessions.title')}>
                    <ItemPtSessionComponent isLoading={true} />
                    <ItemPtSessionComponent isLoading={true} />
                    <ItemPtSessionComponent isLoading={true} />
                </ListComponent>
            ) : ptSessions.length ? (
                <ListComponent title={t('pomodoro-sessions.title')}>
                    {ptSessions.map(ptSession => (
                        <ItemPtSessionComponent
                            title={ptSession.type}
                            type={ptSession.type}
                            totalSeconds={ptSession.totalSeconds}
                        />
                    ))}
                </ListComponent>
            ) : null}
            <ProfileSettingsComponent
                isOpen={isOpenSettings}
                onClose={() => setIsOpenSettings(false)}
            />
        </>
    )
}
