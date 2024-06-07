'use client'

import {taskService} from '@/services/task.service'
import {useQuery} from '@tanstack/react-query'
import {useEffect} from 'react'
import {toast} from 'sonner'

export const useTask = (taskId: string) => {
    const {data, isSuccess, isLoading, isError, error} = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => taskService.getTaskById(taskId),
        enabled: !!taskId
    })

    useEffect(() => {
        if (error) {
            toast.error(error as unknown as string)
        }
    }, [error])

    return {task: data, isSuccess, isLoading, isError, error}
}
