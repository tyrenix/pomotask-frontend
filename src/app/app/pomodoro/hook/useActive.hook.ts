import {ptSessionService} from '@/services/pt-session.service'
import {IPomodoroSession} from '@/types/pomodoro-session.types'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {useEffect, useState} from 'react'
import {toast} from 'sonner'

export const useActive = () => {
    const queryClient = useQueryClient()

    const {data, refetch, ...query} = useQuery({
        queryKey: ['pomodoro-session'],
        queryFn: () => ptSessionService.getActive()
    })

    const createMutation = useMutation({
        mutationKey: ['pomodoro-session', 'create'],
        mutationFn: (taskId?: string) => ptSessionService.create(taskId),
        onError(error) {
            toast.error(error as unknown as string)
        },
        onSuccess() {
            refetch()
        }
    })

    const startOrPauseMutation = useMutation({
        mutationKey: ['pomodoro-session', 'pauseOrStart'],
        mutationFn: (id: string) => ptSessionService.pauseOrStart(id),
        onError(error) {
            toast.error(error as unknown as string)
        },
        onSuccess() {
            refetch()
        }
    })

    const completionMutation = useMutation({
        mutationKey: ['pomodoro-session', 'completion'],
        mutationFn: (id: string) => ptSessionService.completion(id),
        onError() {
            refetch()
        },
        onSuccess(data) {
            refetch()

            if (data.taskId) {
                queryClient.invalidateQueries({queryKey: ['task', data.taskId]})
            }
        }
    })

    const deleteMutation = useMutation({
        mutationKey: ['pomodoro-session', 'delete'],
        mutationFn: (id: string) => ptSessionService.delete(id),
        onError(error) {
            toast.error(error as unknown as string)
        },
        onSuccess() {
            refetch()
        }
    })

    const [active, setActive] = useState<IPomodoroSession | undefined>()

    useEffect(() => {
        if (query.error) {
            toast.error(query.error as unknown as string)
        }
    }, [query.error])

    useEffect(() => {
        setActive(data || undefined)
    }, [data])

    const isPending =
        createMutation.isPending ||
        deleteMutation.isPending ||
        completionMutation.isPending ||
        startOrPauseMutation.isPending

    return {
        query,
        active,
        setActive,
        isPending,
        isLoading: query.isLoading,
        createMutation,
        deleteMutation,
        completionMutation,
        startOrPauseMutation
    }
}
