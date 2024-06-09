'use client'

import {getHoursAndMinutes} from '@/helpers/get-hours-and-minutes.helper'
import {useTask} from '@/hooks/useTask.hook'
import {useUserActivity} from '@/hooks/useUserActivity.hook'
import clsx from 'clsx'
import {
    CircleFadingPlusIcon,
    Code2Icon,
    HistoryIcon,
    PlayIcon,
    StepForwardIcon
} from 'lucide-react'
import {useTranslations} from 'next-intl'
import {act, useEffect, useState} from 'react'
import {SelectTaskComponent} from './components/select-task.component'
import styles from './pomodoro-view.module.css'
import {selectTaskService} from './services/select-task.service'

export const PomodoroView = () => {
    const tUnits = useTranslations('Units')
    const t = useTranslations('Pomodoro')

    const [isOpenSelectTask, setIsOpenSelectTask] = useState<boolean>(false)
    const [selectedTask, setSelectedTask] = useState<string | undefined>(
        undefined
    )

    const selectTask = (taskId?: string) => {
        setSelectedTask(taskId)
        selectTaskService.select(taskId)
    }

    useEffect(() => {
        setSelectedTask(selectTaskService.get())
    }, [])

    const {task, isLoading: isLoadingTask} = useTask(selectedTask || '')
    const {activity, isLoading: isLoadingActivity} = useUserActivity({
        filters: {taskId: selectedTask, filter: 'total'},
        enabled: !!selectedTask
    })

    return (
        <>
            <div className={styles.wrapper}>
                <div
                    className={styles.wrapperSelectTask}
                    onClick={
                        isLoadingActivity || isLoadingTask
                            ? undefined
                            : () => setIsOpenSelectTask(true)
                    }
                >
                    <div
                        className={clsx(
                            styles.wrapperSelectTaskIcon,
                            isLoadingTask || isLoadingActivity
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
                            (isLoadingActivity || isLoadingTask) &&
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
                <div className={styles.wrapperPomodoro}>
                    <svg className={styles.pomodoro}>
                        <circle
                            cx='50%'
                            cy='50%'
                            r='120'
                            stroke='currentColor'
                            strokeWidth={35}
                            fill='transparent'
                        />
                        <circle
                            cx='50%'
                            cy='50%'
                            r='120'
                            stroke='rgb(var(--accent-color))'
                            strokeWidth={35}
                            fill='transparent'
                            strokeDasharray='754.08935546875'
                            strokeDashoffset='75'
                            strokeLinecap='round'
                        />
                    </svg>
                    <div>
                        <h4>25:00</h4>
                        <p>2 of 4 steps!</p>
                    </div>
                </div>
                <div className={styles.wrapperAlert}>Start and focus!</div>
                <div className={styles.wrapperButtons}>
                    <button className={styles.secondaryButton}>
                        <HistoryIcon />
                    </button>
                    <button className={styles.mainButton}>
                        <PlayIcon />
                    </button>
                    <button className={styles.secondaryButton}>
                        <StepForwardIcon />
                    </button>
                </div>
            </div>
            <SelectTaskComponent
                isOpen={isOpenSelectTask}
                onClose={() => setIsOpenSelectTask(false)}
                selectTask={selectTask}
            />
        </>
    )
}
