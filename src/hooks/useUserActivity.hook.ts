import {toast} from 'sonner'
import {useEffect} from 'react'
import {useQuery} from '@tanstack/react-query'
import {ptSessionService} from '@/services/pt-session.service'
import {IActivityFiltersPomodoroSession} from '@/types/pomodoro-session.types'

export const useUserActivity = ({filter}: IActivityFiltersPomodoroSession) => {
    const {data, isLoading, error, isError} = useQuery({
        queryKey: ['userActivity', filter],
        queryFn: () => ptSessionService.getUserActivity({filter})
    })

    useEffect(() => {
        if (error) {
            toast.error(error as any)
        }
    }, [error])

    return {
        activity: data?.activity || 0,
        isLoading,
        isError,
        error
    }
}
