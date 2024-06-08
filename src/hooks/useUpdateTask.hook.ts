'use client'

import {taskService} from '@/services/task.service'
import {IUpdateTask} from '@/types/task.types'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {toast} from 'sonner'

export const useUpdateTask = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (data: {taskId: string; data: IUpdateTask}) =>
            taskService.updateTaskById(data.taskId, data.data),
        onError(error) {
            toast.error(error as unknown as string)
        },
        onSuccess(task) {
            queryClient.invalidateQueries({
                queryKey: ['tasks']
            })
            queryClient.invalidateQueries({
                queryKey: ['task', task.id]
            })
        }
    })

    return mutation
}
