'use client'

import {getHoursAndMinutes} from '@/helpers/get-hours-and-minutes.helper'
import {useTask} from '@/hooks/useTask.hook'
import {useUserActivity} from '@/hooks/useUserActivity.hook'
import clsx from 'clsx'
import {CircleFadingPlusIcon, Code2Icon} from 'lucide-react'
import {useTranslations} from 'next-intl'
import {useEffect, useState} from 'react'
import {SelectTaskComponent} from './components/select-task.component'
import {TimerComponent} from './components/timer.component'
import styles from './pomodoro-view.module.css'
import {selectTaskService} from './services/select-task.service'
import {useActive} from './hook/useActive.hook'

export const PomodoroView = () => {
    const tUnits = useTranslations('Units')
    const t = useTranslations('Pomodoro')

    const [isOpenSelectTask, setIsOpenSelectTask] = useState<boolean>(false)
    const [selectedTask, setSelectedTask] = useState<string | null | undefined>(
        null
    )

    const {active} = useActive()

    const selectTask = (taskId?: string) => {
        setSelectedTask(taskId)
        selectTaskService.select(taskId)
    }

    useEffect(() => {
        setSelectedTask(selectTaskService.get())
    }, [])

    const {task, isLoading: isLoadingTask, error} = useTask(selectedTask || '')
    const {activity, isLoading: isLoadingActivity} = useUserActivity({
        filters: {taskId: selectedTask || undefined, filter: 'total'},
        enabled: !!selectedTask
    })

    useEffect(() => {
        if ((task && task.isCompleted) || (!task && error)) {
            selectTask()
        }
    }, [task, error])

    return (
        <>
            <div className={styles.wrapper}>
                <div
                    className={styles.wrapperSelectTask}
                    onClick={
                        isLoadingActivity || isLoadingTask || active
                            ? undefined
                            : () => setIsOpenSelectTask(true)
                    }
                >
                    <div
                        className={clsx(
                            styles.wrapperSelectTaskIcon,
                            isLoadingTask ||
                                isLoadingActivity ||
                                (!task && selectedTask === null)
                                ? 'skeletron-loader'
                                : 'bg-accent'
                        )}
                    >
                        {!task ? (
                            <CircleFadingPlusIcon strokeWidth={3} />
                        ) : (
                            <Code2Icon strokeWidth={3} />
                        )}
                    </div>
                    <div
                        className={clsx(
                            styles.wrapperSelectTaskDescription,
                            (isLoadingActivity ||
                                isLoadingTask ||
                                (!task && selectedTask === null)) &&
                                'skeletron-loader !h-14'
                        )}
                    >
                        <h4>
                            {!task
                                ? t('select-task.container.title')
                                : task.title}
                        </h4>
                        <p>
                            {!task
                                ? t('select-task.container.description')
                                : `${t('select-task.container.activity')}: ${
                                      getHoursAndMinutes(activity || 0, {
                                          hours: tUnits('shortHours'),
                                          mins: tUnits('shortMinutes')
                                      }).string
                                  }`}
                        </p>
                    </div>
                </div>
                <TimerComponent taskId={selectedTask || undefined} />
            </div>
            <SelectTaskComponent
                isOpen={isOpenSelectTask}
                onClose={() => setIsOpenSelectTask(false)}
                selectTask={selectTask}
            />
        </>
    )
}
