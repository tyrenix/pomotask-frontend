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
import {PtSessionListComponent} from '@/app/app/components/PtSessionList/pt-session-list.component'
import {PtSessionInfoComponent} from '@/app/app/components/PtSessionInfo/pt-session-info.component'

export const ProfileComponent = () => {
    const tUnit = useTranslations('Units')
    const t = useTranslations('Profile')

    const [isOpenSettings, setIsOpenSettings] = useState<boolean>(false)
    const [isOpenPtSessionsList, setIsOpenPtSessionsList] =
        useState<boolean>(false)
    const [openPtSessionInfo, setOpenPtSession] = useState<string | null>(null)

    const {user, isLoading: isLoadingUser} = useUser()

    const {activity: activityTotal, isLoading: isLoadingUserActivityTotal} =
        useUserActivity({filters: {filter: 'total'}})
    const {activity: activityDay, isLoading: isLoadingUserActivityDay} =
        useUserActivity({filters: {filter: 'day'}})
    const {activity: activityWeek, isLoading: isLoadingUserActivityWeek} =
        useUserActivity({filters: {filter: 'week'}})

    const {ptSettings, isLoading: isLoadingPtSettings} = usePtSettings()
    const {ptSessions, isLoading: isLoadingPtSessions} = usePtSessions({
        filters: {isCompleted: true, limit: 10},
        enabled: true
    })

    return (
        <>
            {!user || isLoadingUser || isLoadingUserActivityTotal ? (
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
                            getHoursAndMinutes(activityTotal, {
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
            {!ptSettings ||
            isLoadingUserActivityDay ||
            isLoadingUserActivityWeek ||
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
                            completedSeconds={activityDay}
                            totalSeconds={ptSettings.workingTime}
                        />
                        <ActivityComponent
                            title={t('activity.week')}
                            completedSeconds={activityWeek}
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
            ) : ptSessions.pages[0].length ? (
                <ListComponent title={t('pomodoro-sessions.title')}>
                    {ptSessions.pages[0].map((ptSession, index) => (
                        <ItemPtSessionComponent
                            key={index}
                            ptSession={ptSession}
                            onClick={() => setOpenPtSession(ptSession.id)}
                        />
                    ))}
                    <ItemTransitionComponent
                        onClick={() => setIsOpenPtSessionsList(true)}
                        size='medium'
                        title={t('pomodoro-sessions.openFull')}
                    />
                </ListComponent>
            ) : null}
            <ProfileSettingsComponent
                isOpen={isOpenSettings}
                onClose={() => setIsOpenSettings(false)}
            />
            <PtSessionListComponent
                isOpen={isOpenPtSessionsList}
                onClose={() => setIsOpenPtSessionsList(false)}
            />
            <PtSessionInfoComponent
                isOpen={!!openPtSessionInfo}
                onClose={() => setOpenPtSession(null)}
                ptSessionId={openPtSessionInfo || ''}
            />
        </>
    )
}
