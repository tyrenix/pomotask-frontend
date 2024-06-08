import {ActivityComponent} from '@/components/Activity/activity.component'
import {
    ItemPtSessionComponent,
    ItemTaskComponent,
    ItemTransitionComponent
} from '@/components/ItemList'
import {ListComponent} from '@/components/List/list.component'
import {PopUpMenuComponent} from '@/components/PopUpMenu/popup-menu.component'
import {useTask} from '@/hooks/useTask.hook'
import {useTranslations} from 'next-intl'
import Textarea from 'react-expanding-textarea'

import styles from './task-info.module.css'
import {useUserActivity} from '@/hooks/useUserActivity.hook'
import {usePtSettings} from '@/hooks/usePtSettings.hook'
import {usePtSessions} from '@/hooks/usePtSessions.hook'

interface IProps {
    isOpen: boolean
    onClose: () => any
    taskId: string
}

export const TaskInfoComponent = ({isOpen, taskId, onClose}: IProps) => {
    const t = useTranslations('Task')

    const {isLoading, task} = useTask(taskId)
    const {ptSettings, isLoading: isLoadingPtSettings} = usePtSettings()
    const {activity: activityDay, isLoading: isLoadingActivityDay} =
        useUserActivity({
            filters: {taskId: task?.id, filter: 'day'},
            enabled: !!task?.id
        })
    const {activity: activityWeek, isLoading: isLoadingActivityWeek} =
        useUserActivity({
            filters: {taskId: task?.id, filter: 'week'},
            enabled: !!task?.id
        })
    const {ptSessions, isLoading: isLoadingPtSessions} = usePtSessions({
        enabled: !!task?.id,
        filters: {taskId: task?.id, limit: 10}
    })

    return (
        <PopUpMenuComponent
            className='flex flex-col gap-4 pb-20'
            title={t('title')}
            isOpen={isOpen}
            onClose={onClose}
        >
            {!task || isLoading ? null : (
                <ListComponent>
                    <ItemTaskComponent task={task} changeCompleted={() => {}} />
                    <div className={styles.wrapperDescription}>
                        <Textarea
                            maxLength={128}
                            placeholder={t('enterDescription')}
                        />
                    </div>
                </ListComponent>
            )}
            {isLoadingActivityDay ||
            isLoadingActivityWeek ||
            isLoadingPtSettings ? (
                <ListComponent title={t('timeSpent.title')}>
                    <div className='flex flex-col p-standard gap-4'>
                        <ActivityComponent isLoading={true} />
                        <ActivityComponent isLoading={true} />
                    </div>
                </ListComponent>
            ) : (
                <ListComponent title={t('timeSpent.title')}>
                    <div className='flex flex-col p-standard gap-4'>
                        <ActivityComponent
                            title={t('timeSpent.today')}
                            completedSeconds={activityDay}
                            totalSeconds={ptSettings?.workingTime || 0}
                        />
                        <ActivityComponent
                            title={t('timeSpent.week')}
                            completedSeconds={activityWeek}
                            totalSeconds={(ptSettings?.workingTime || 0) * 7}
                        />
                    </div>
                </ListComponent>
            )}
            {!ptSessions || isLoadingPtSessions ? (
                <ListComponent title={t('activity.title')}>
                    <ItemPtSessionComponent isLoading={true} />
                    <ItemPtSessionComponent isLoading={true} />
                    <ItemPtSessionComponent isLoading={true} />
                    <ItemPtSessionComponent isLoading={true} />
                    <ItemPtSessionComponent isLoading={true} />
                </ListComponent>
            ) : ptSessions.pages[0].length > 0 ? (
                <ListComponent title={t('activity.title')}>
                    {ptSessions?.pages[0].map(ptSession => (
                        <ItemPtSessionComponent
                            key={ptSession.id}
                            ptSession={ptSession}
                        />
                    ))}
                    <ItemTransitionComponent
                        title={t('activity.openAll')}
                        size='medium'
                    />
                </ListComponent>
            ) : null}
        </PopUpMenuComponent>
    )
}
