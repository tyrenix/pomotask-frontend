'use client'

import {
    ItemDefaultComponent,
    ItemTaskComponent,
    ItemTransitionComponent
} from '@/components/ItemList'
import {ListComponent} from '@/components/List/list.component'
import {useTasks} from '@/hooks/useTasks.hook'
import {useUpdateTask} from '@/hooks/useUpdateTask.hook'
import {taskService} from '@/services/task.service'
import {
    DragDropContext,
    Draggable,
    Droppable,
    type DropResult
} from '@hello-pangea/dnd'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {BetweenHorizontalStartIcon} from 'lucide-react'
import type {ReactNode} from 'react'
import {toast} from 'sonner'
import styles from './tasks-list-dnd.module.css'
import {useTranslations} from 'next-intl'

interface IProps {
    isCompleted?: boolean
    openTaskInfo?: (taskId: string) => any
    NotFoundComponent?: ReactNode
    addTask?: {
        onClick(): void
    }
}

export const TasksListDndComponent = ({
    isCompleted,
    openTaskInfo,
    NotFoundComponent,
    addTask
}: IProps) => {
    const queryClient = useQueryClient()
    const t = useTranslations('Tasks')

    const {tasks, isLoading, setTasks} = useTasks({isCompleted})

    const {mutate: mutateUpdateIndex} = useMutation({
        mutationKey: ['tasks-update-index'],
        mutationFn: (tasksIds: string[]) => taskService.updateIndex(tasksIds),
        onError(error) {
            toast.error(error as unknown as string)
        },
        onSuccess() {
            queryClient.invalidateQueries({queryKey: ['tasks']})
        }
    })

    const onDragEnd = (result: DropResult) => {
        const {source, destination} = result
        if (!destination || !tasks) return

        let updatedTasks = [...tasks]
        const [movedTask] = updatedTasks.splice(source.index, 1)
        movedTask && updatedTasks.splice(destination.index, 0, movedTask)
        updatedTasks = updatedTasks.map((task, index) => ({...task, index}))

        const ids = updatedTasks.map(task => task.id)
        mutateUpdateIndex(ids)

        setTasks(updatedTasks)
    }

    const {mutate} = useUpdateTask()
    const changeCompleted = (taskId: string, statusIsCompleted: boolean) => {
        setTasks(tasks => {
            if (!tasks) return

            const index = tasks?.findIndex(task => task.id === taskId)
            tasks.splice(index, 1, {
                ...tasks[index],
                isCompleted: statusIsCompleted
            })

            return tasks
        })

        mutate({taskId, data: {isCompleted: statusIsCompleted}})
    }

    return (
        <>
            {isLoading ? (
                <ListComponent>
                    <ItemTaskComponent isLoading={true} />
                    <ItemTaskComponent isLoading={true} />
                    <ItemTaskComponent isLoading={true} />
                    <ItemTaskComponent isLoading={true} />
                    <ItemTaskComponent isLoading={true} />
                </ListComponent>
            ) : tasks ? (
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId='droppable_1'>
                        {provider => (
                            <div
                                className={styles.wrapperList}
                                ref={provider.innerRef}
                                {...provider.droppableProps}
                            >
                                {tasks.map((task, index) => (
                                    <Draggable
                                        key={task.id}
                                        draggableId={task.id}
                                        index={task.index}
                                    >
                                        {provider => (
                                            <div
                                                className='bg-primary rounded-2xl overflow-hidden transition-colors-custom'
                                                ref={provider.innerRef}
                                                {...provider.draggableProps}
                                                {...provider.dragHandleProps}
                                            >
                                                <ItemTaskComponent
                                                    task={task}
                                                    changeCompleted={() =>
                                                        changeCompleted(
                                                            task.id,
                                                            !task.isCompleted
                                                        )
                                                    }
                                                    onClick={() =>
                                                        openTaskInfo &&
                                                        openTaskInfo(task.id)
                                                    }
                                                />
                                                <span className='hidden' />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {addTask && (
                                    <ItemDefaultComponent
                                        className='text-accent-70'
                                        size='medium'
                                        title={t('add-task')}
                                        onClick={addTask.onClick}
                                        leftComponent={
                                            tasks.length > 0 && (
                                                <div className='w-7 h-7' />
                                            )
                                        }
                                    />
                                )}
                                {provider.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            ) : (
                NotFoundComponent
            )}
        </>
    )
}
