'use client'

import {taskService} from '@/services/task.service'
import {ITask} from '@/types/task.types'
import {useQuery} from '@tanstack/react-query'
import {useEffect, useState} from 'react'
import {toast} from 'sonner'

export const useTask = (taskId: string) => {
    const {data, isSuccess, isLoading, isError, error} = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => taskService.getTaskById(taskId),
        enabled: !!taskId
    })

    const [task, setTask] = useState<ITask | undefined>(undefined)

    useEffect(() => {
        if (error) {
            toast.error(error as unknown as string)
        }
    }, [error])

    useEffect(() => {
        setTask(data)
    }, [data])

    return {task, setTask, isSuccess, isLoading, isError, error}
}
