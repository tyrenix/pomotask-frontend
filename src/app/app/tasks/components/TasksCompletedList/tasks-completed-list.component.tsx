'use client'

import {TaskInfoComponent} from '@/app/app/components/TaskInfo/task-info.component'
import {PopUpMenuComponent} from '@/components/PopUpMenu/popup-menu.component'
import {useTranslations} from 'next-intl'
import {useState} from 'react'
import {TasksListDndComponent} from '../TasksLIstDnd/tasks-list-dnd.component'
import styles from './tasks-completed-list.module.css'

interface IProps {
    isOpen: boolean
    onClose: () => any
}

export const TasksCompletedListComponent = ({isOpen, onClose}: IProps) => {
    const t = useTranslations('Tasks')

    const [openTaskInfo, setOpenTaskInfo] = useState<string | null>(null)

    return (
        <>
            <PopUpMenuComponent
                isOpen={isOpen}
                onClose={onClose}
                title={t('completed')}
            >
                <TasksListDndComponent
                    openTaskInfo={setOpenTaskInfo}
                    NotFoundComponent={
                        <div className={styles.wrapperNotFound}>
                            {t('tasksCompletedNotFound')}
                        </div>
                    }
                    isCompleted={true}
                />
            </PopUpMenuComponent>
            <TaskInfoComponent
                isOpen={!!openTaskInfo}
                onClose={() => setOpenTaskInfo(null)}
                taskId={openTaskInfo || ''}
            />
        </>
    )
}
