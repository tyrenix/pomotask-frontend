'use client'

import {ItemTaskComponent, ItemTransitionComponent} from '@/components/ItemList'
import {ListComponent} from '@/components/List/list.component'
import {useTasks} from '@/hooks/useTasks.hook'
import {BadgeCheckIcon} from 'lucide-react'
import {useTranslations} from 'next-intl'
import {TasksCompletedListComponent} from './components/TasksCompletedList/tasks-completed-list.component'
import {useState} from 'react'
import {useUpdateTask} from '@/hooks/useUpdateTask.hook'

export const TaskView = () => {
    const t = useTranslations('Tasks')

    const [isOpenTasksCompleted, setIsOpenTasksCompleted] =
        useState<boolean>(false)

    const {tasks, setTasks, isLoading} = useTasks({isCompleted: false})
    const {mutate} = useUpdateTask()

    const changeCompleted = (taskId: string, isCompleted: boolean) => {
        setTasks(tasks => {
            if (!tasks) return

            const index = tasks?.findIndex(task => task.id === taskId)
            if (isCompleted && index !== -1) tasks.splice(index, 1)
            else if (!isCompleted && index !== -1)
                tasks.splice(index, 1, {...tasks[index], isCompleted})

            return tasks
        })

        mutate({taskId, data: {isCompleted}})
    }

    return (
        <>
            {!tasks || isLoading ? (
                <ListComponent>
                    <ItemTaskComponent isLoading={true} />
                    <ItemTaskComponent isLoading={true} />
                    <ItemTaskComponent isLoading={true} />
                    <ItemTaskComponent isLoading={true} />
                    <ItemTaskComponent isLoading={true} />
                </ListComponent>
            ) : (
                tasks.length > 0 && (
                    <ListComponent>
                        {tasks.map(task => (
                            <ItemTaskComponent
                                key={task.id}
                                task={task}
                                onClick={() => {}}
                                changeCompleted={() =>
                                    changeCompleted(task.id, !task.isCompleted)
                                }
                                isLoading={false}
                            />
                        ))}
                    </ListComponent>
                )
            )}
            <ListComponent title={t('completed')}>
                {isLoading ? (
                    <ItemTransitionComponent isLoading={true} />
                ) : (
                    <ItemTransitionComponent
                        size='medium'
                        title={t('completed')}
                        onClick={() => setIsOpenTasksCompleted(true)}
                        leftComponent={
                            <BadgeCheckIcon className='h-7 w-7 text-primaryInvert-70' />
                        }
                    />
                )}
            </ListComponent>
            <TasksCompletedListComponent
                isOpen={isOpenTasksCompleted}
                onClose={() => setIsOpenTasksCompleted(false)}
            />
        </>
    )
}
