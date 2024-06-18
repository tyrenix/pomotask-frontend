import {ptSessionService} from '@/services/pt-session.service'
import {IPomodoroSession} from '@/types/pomodoro-session.types'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {useEffect, useState} from 'react'
import {toast} from 'sonner'

export const useActive = () => {
    const queryClient = useQueryClient()

    const [isPending, setIsPending] = useState<boolean>(false)

    const {data, refetch, ...query} = useQuery({
        queryKey: ['pomodoro-session'],
        queryFn: () => ptSessionService.getActive(),
        refetchOnWindowFocus: true,
        refetchOnMount: false
    })

    const upcoming = useQuery({
        queryKey: ['pomodoro-session', 'upcoming'],
        queryFn: () => ptSessionService.upcoming(),
        refetchOnWindowFocus: true
    })

    const createMutation = useMutation({
        mutationKey: ['pomodoro-session', 'create'],
        mutationFn: (taskId?: string) => {
            setIsPending(true)
            return ptSessionService.create(taskId)
        },
        onError(error) {
            toast.error(error as unknown as string)
        },
        onSuccess() {
            refetch()
        }
    })

    const startOrPauseMutation = useMutation({
        mutationKey: ['pomodoro-session', 'pauseOrStart'],
        mutationFn: (id: string) => {
            setIsPending(true)
            return ptSessionService.pauseOrStart(id)
        },
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
            upcoming.refetch()
            refetch()

            if (data.taskId) {
                queryClient.invalidateQueries({queryKey: ['task', data.taskId]})
                queryClient.invalidateQueries({
                    queryKey: [
                        'pomodoro-session-activity',
                        {taskId: data.taskId, filter: 'total'}
                    ]
                })
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
            upcoming.refetch()
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
        setIsPending(false)
    }, [data])

    return {
        query,
        active,
        setActive,
        isPending,
        isLoading: query.isLoading || query.isPending,
        createMutation,
        deleteMutation,
        completionMutation,
        startOrPauseMutation,
        upcoming
    }
}
