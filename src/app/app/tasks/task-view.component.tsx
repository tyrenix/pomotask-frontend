'use client'

import {ItemTaskComponent, ItemTransitionComponent} from '@/components/ItemList'
import {ListComponent} from '@/components/List/list.component'
import {useTasks} from '@/hooks/useTasks.hook'
import {useUpdateTask} from '@/hooks/useUpdateTask.hook'
import {CircleCheckBigIcon, PlusIcon} from 'lucide-react'
import {useTranslations} from 'next-intl'
import {useState} from 'react'
import {TaskInfoComponent} from '../components/TaskInfo/task-info.component'
import {TasksCompletedListComponent} from './components/TasksCompletedList/tasks-completed-list.component'

import styles from './task-view.module.css'
import {AddTaskComponent} from './components/AddTask/add-task.component'

export const TaskView = () => {
    const t = useTranslations('Tasks')

    const [openTaskInfo, setOpenTaskInfo] = useState<string | null>(null)
    const [isOpenAddTask, setIsOpenAddTask] = useState<boolean>(false)
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
                                onClick={() => setOpenTaskInfo(task.id)}
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
                            <CircleCheckBigIcon className='h-7 w-7 text-primaryInvert-70' />
                        }
                    />
                )}
            </ListComponent>
            <div
                className={styles.wrapperAddTask}
                onClick={() => setIsOpenAddTask(true)}
            >
                <PlusIcon strokeWidth={3} />
            </div>
            <TasksCompletedListComponent
                isOpen={isOpenTasksCompleted}
                onClose={() => setIsOpenTasksCompleted(false)}
            />
            <TaskInfoComponent
                isOpen={!!openTaskInfo}
                onClose={() => setOpenTaskInfo(null)}
                taskId={openTaskInfo || ''}
            />
            <AddTaskComponent
                isOpen={isOpenAddTask}
                onClose={() => setIsOpenAddTask(false)}
            />
        </>
    )
}
