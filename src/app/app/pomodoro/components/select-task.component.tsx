'use client'

import {ItemDefaultComponent, ItemTaskComponent} from '@/components/ItemList'
import {ListComponent} from '@/components/List/list.component'
import {PopUpMenuComponent} from '@/components/PopUpMenu/popup-menu.component'
import {useTasks} from '@/hooks/useTasks.hook'
import {useTranslations} from 'next-intl'
import styles from './select-task.module.css'
import {TrashIcon} from 'lucide-react'

interface IProps {
    isOpen: boolean
    onClose: () => any
    selectTask: (taskId: string | undefined) => any
}

export const SelectTaskComponent = ({isOpen, onClose, selectTask}: IProps) => {
    const t = useTranslations('Pomodoro.select-task')

    const {tasks, isLoading} = useTasks({isCompleted: false})

    const onSelectTask = (taskId: string | undefined) => {
        selectTask(taskId)
        onClose()
    }

    return (
        <PopUpMenuComponent
            className='flex flex-col gap-4'
            title={t('title')}
            isOpen={isOpen}
            onClose={onClose}
        >
            {isLoading ? (
                <ListComponent>
                    <ItemTaskComponent isLoading={true} />
                    <ItemTaskComponent isLoading={true} />
                    <ItemTaskComponent isLoading={true} />
                    <ItemTaskComponent isLoading={true} />
                    <ItemTaskComponent isLoading={true} />
                </ListComponent>
            ) : (
                <>
                    <ListComponent>
                        {tasks &&
                            tasks.map(task => (
                                <ItemTaskComponent
                                    key={task.id}
                                    changeCompleted={() => {}}
                                    onClick={() => onSelectTask(task.id)}
                                    task={task}
                                    type='select'
                                />
                            ))}
                    </ListComponent>
                    <ListComponent>
                        <ItemDefaultComponent
                            size='big'
                            title={t('delete-task')}
                            onClick={() => onSelectTask(undefined)}
                            leftComponent={
                                <TrashIcon className='h-7 w-7 text-primaryInvert-70' />
                            }
                        />
                    </ListComponent>
                </>
            )}
        </PopUpMenuComponent>
    )
}
