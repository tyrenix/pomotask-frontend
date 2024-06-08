'use client'

import {TaskInfoComponent} from '@/app/app/components/TaskInfo/task-info.component'
import {ItemTaskComponent} from '@/components/ItemList'
import {ListComponent} from '@/components/List/list.component'
import {PopUpMenuComponent} from '@/components/PopUpMenu/popup-menu.component'
import {useTasks} from '@/hooks/useTasks.hook'
import {useUpdateTask} from '@/hooks/useUpdateTask.hook'
import {useTranslations} from 'next-intl'
import {useState} from 'react'

interface IProps {
    isOpen: boolean
    onClose: () => any
}

export const TasksCompletedListComponent = ({isOpen, onClose}: IProps) => {
    const t = useTranslations('Tasks')

    const [openTaskInfo, setOpenTaskInfo] = useState<string | null>(null)

    const {tasks, setTasks, isLoading} = useTasks({isCompleted: true})
    const {mutate} = useUpdateTask()

    const changeCompleted = (taskId: string, isCompleted: boolean) => {
        setTasks(tasks => {
            if (!tasks) return

            const index = tasks?.findIndex(task => task.id === taskId)
            if (!isCompleted && index !== -1) tasks.splice(index, 1)
            else if (isCompleted && index !== -1)
                tasks.splice(index, 1, {...tasks[index], isCompleted})

            return tasks
        })

        mutate({taskId, data: {isCompleted}})
    }

    return (
        <>
            <PopUpMenuComponent
                isOpen={isOpen}
                onClose={onClose}
                title={t('completed')}
            >
                {isLoading ? (
                    <ListComponent>
                        <ItemTaskComponent isLoading={true} />
                        <ItemTaskComponent isLoading={true} />
                        <ItemTaskComponent isLoading={true} />
                        <ItemTaskComponent isLoading={true} />
                        <ItemTaskComponent isLoading={true} />
                    </ListComponent>
                ) : tasks?.length ? (
                    <ListComponent>
                        {tasks.map(task => (
                            <ItemTaskComponent
                                key={task.id}
                                task={task}
                                changeCompleted={() =>
                                    changeCompleted(task.id, !task.isCompleted)
                                }
                                onClick={() => setOpenTaskInfo(task.id)}
                                isLoading={false}
                            />
                        ))}
                    </ListComponent>
                ) : (
                    <div className='h-full w-full flex justify-center items-center text-lg-bold pb-[25%]'>
                        {t('tasksCompletedNotFound')}
                    </div>
                )}
            </PopUpMenuComponent>
            <TaskInfoComponent
                isOpen={!!openTaskInfo}
                onClose={() => setOpenTaskInfo(null)}
                taskId={openTaskInfo || ''}
            />
        </>
    )
}
