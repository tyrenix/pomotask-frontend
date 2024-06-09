'use client'

import {ItemTransitionComponent} from '@/components/ItemList'
import {ListComponent} from '@/components/List/list.component'
import {CircleCheckBigIcon, PlusIcon} from 'lucide-react'
import {useTranslations} from 'next-intl'
import {useState} from 'react'
import {TaskInfoComponent} from '../components/TaskInfo/task-info.component'
import {AddTaskComponent} from './components/AddTask/add-task.component'
import {TasksCompletedListComponent} from './components/TasksCompletedList/tasks-completed-list.component'
import {TasksListDndComponent} from './components/TasksLIstDnd/tasks-list-dnd.component'

import styles from './task-view.module.css'

export const TaskView = () => {
    const t = useTranslations('Tasks')

    const [openTaskInfo, setOpenTaskInfo] = useState<string | null>(null)
    const [isOpenAddTask, setIsOpenAddTask] = useState<boolean>(false)
    const [isOpenTasksCompleted, setIsOpenTasksCompleted] =
        useState<boolean>(false)

    return (
        <>
            <TasksListDndComponent
                isCompleted={false}
                openTaskInfo={taskId => setOpenTaskInfo(taskId)}
            />
            <ListComponent title={t('completed')}>
                <ItemTransitionComponent
                    size='medium'
                    title={t('completed')}
                    onClick={() => setIsOpenTasksCompleted(true)}
                    leftComponent={
                        <CircleCheckBigIcon className='h-7 w-7 text-primaryInvert-70' />
                    }
                />
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
