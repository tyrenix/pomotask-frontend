'use client'

import {toast} from 'sonner'
import {useEffect} from 'react'
import {type QueryKey, useQuery} from '@tanstack/react-query'
import {taskService} from '@/services/task.service'
import {ITask} from '@/types/task.types'

export default function MainPage() {
    const {data, error} = useQuery<ITask[], string, ITask[], QueryKey>({
        queryKey: ['tasks'],
        queryFn: () => taskService.getAllTasks()
    })

    useEffect(() => {
        if (error) {
            toast.error(error)
        }
    }, [error])

    return <h1>data: {JSON.stringify(data || {message: 'not found!'})}</h1>
}
