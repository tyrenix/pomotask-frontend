'use client'

import {taskService} from '@/services/task.service'
import {IFiltersSearchTask, ITask} from '@/types/task.types'
import {useQuery} from '@tanstack/react-query'
import {useEffect, useState} from 'react'
import {toast} from 'sonner'

export const useTasks = (filters?: IFiltersSearchTask) => {
    const {data, isSuccess, isLoading, isError, error, refetch} = useQuery({
        queryKey: ['tasks', filters],
        queryFn: () => taskService.getAllTasks(filters)
    })

    const [tasks, setTasks] = useState<ITask[] | undefined>(undefined)

    useEffect(() => {
        if (error) {
            toast.error(error as unknown as string)
        }
    }, [error])

    useEffect(() => {
        setTasks(data)
    }, [data])

    return {tasks, setTasks, isSuccess, isLoading, isError, refetch, error}
}
