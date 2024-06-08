'use client'

import {ActivityComponent} from '@/components/Activity/activity.component'
import {CheckBoxTaskComponent} from '@/components/CheckBox'
import {
    ItemPtSessionComponent,
    ItemTaskComponent,
    ItemTransitionComponent
} from '@/components/ItemList'
import {ListComponent} from '@/components/List/list.component'
import {PopUpMenuComponent} from '@/components/PopUpMenu/popup-menu.component'
import {usePtSessions} from '@/hooks/usePtSessions.hook'
import {usePtSettings} from '@/hooks/usePtSettings.hook'
import {useStatusView} from '@/hooks/useStatusView.hook'
import {useTask} from '@/hooks/useTask.hook'
import {useTaskDebounce} from '@/hooks/useTaskDebounce.hook'
import {useUserActivity} from '@/hooks/useUserActivity.hook'
import {IUpdateTask} from '@/types/task.types'
import clsx from 'clsx'
import {useTranslations} from 'next-intl'
import {useState} from 'react'
import Textarea from 'react-expanding-textarea'
import {Controller, useForm} from 'react-hook-form'
import {PtSessionInfoComponent} from '../PtSessionInfo/pt-session-info.component'
import {PtSessionListComponent} from '../PtSessionList/pt-session-list.component'

import styles from './task-info.module.css'

interface IProps {
    isOpen: boolean
    onClose: () => any
    taskId: string
}

export const TaskInfoComponent = ({isOpen, taskId, onClose}: IProps) => {
    const t = useTranslations('Task')

    const {statusShow, setStatusShow} = useStatusView()
    const [openPtSession, setOpenPtSession] = useState<string | null>(null)
    const [isOpenPtSessionsList, setIsOpenPtSessionsList] =
        useState<boolean>(false)

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

    const {watch, register, control, getValues} = useForm<IUpdateTask>({
        values: {
            isCompleted: task?.isCompleted,
            title: task?.title,
            description: task?.description
        }
    })
    useTaskDebounce({watch, taskId})

    return (
        <>
            <PopUpMenuComponent
                className='flex flex-col gap-4 pb-20'
                title={t('title')}
                isOpen={isOpen}
                onClose={onClose}
            >
                {!task || isLoading ? (
                    <ListComponent>
                        <ItemTaskComponent isLoading={true} />
                        <div className={styles.wrapperDescription}>
                            <div className='w-full h-[65px] skeletron-loader' />
                        </div>
                    </ListComponent>
                ) : (
                    <ListComponent>
                        <div className={styles.wrapperTitle}>
                            <Controller
                                control={control}
                                name='isCompleted'
                                render={({field}) => (
                                    <div
                                        ref={field.ref}
                                        className={styles.wrapperCompletedBox}
                                        onClick={() =>
                                            field.onChange(!task.isCompleted)
                                        }
                                    >
                                        <CheckBoxTaskComponent
                                            changeCompleted={() =>
                                                field.onChange(
                                                    !task.isCompleted
                                                )
                                            }
                                            isCompleted={field.value}
                                        />
                                    </div>
                                )}
                            />
                            <div className={styles.wrapperTitleDescription}>
                                <Textarea
                                    placeholder={t('enterDescription')}
                                    {...register('title', {
                                        value: task.title
                                    })}
                                />
                            </div>
                        </div>
                        <div className={styles.wrapperDescription}>
                            <Textarea
                                placeholder={t('enterDescription')}
                                {...register('description', {
                                    value: task.description
                                })}
                            />
                            <span
                                className={clsx(
                                    (getValues('description')?.length || 0) >
                                        1500
                                        ? 'text-red-500'
                                        : 'text-primaryInvert-50'
                                )}
                            >
                                {getValues('description')?.length || 0}/1500
                            </span>
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
                                totalSeconds={
                                    (ptSettings?.workingTime || 0) * 7
                                }
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
                                onClick={() => {
                                    setOpenPtSession(ptSession.id)
                                    setStatusShow('showing')
                                }}
                            />
                        ))}
                        <ItemTransitionComponent
                            title={t('activity.openAll')}
                            size='medium'
                            onClick={() => setIsOpenPtSessionsList(true)}
                        />
                    </ListComponent>
                ) : null}
            </PopUpMenuComponent>
            <PtSessionListComponent
                isOpen={isOpenPtSessionsList}
                onClose={() => setIsOpenPtSessionsList(false)}
                taskId={task?.id || ''}
            />
            {statusShow !== 'close' && (
                <PtSessionInfoComponent
                    isOpen={!!openPtSession}
                    onClose={() => {
                        setOpenPtSession(null)
                        setStatusShow('closing')
                    }}
                    ptSessionId={openPtSession || ''}
                />
            )}
        </>
    )
}
