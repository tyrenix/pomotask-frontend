import {ptSessionService} from '@/services/pt-session.service'
import {IActivityFiltersPomodoroSession} from '@/types/pomodoro-session.types'
import {useQuery} from '@tanstack/react-query'
import {useEffect} from 'react'
import {toast} from 'sonner'

interface IProps {
    filters?: IActivityFiltersPomodoroSession
    enabled?: boolean
}

export const useUserActivity = ({filters, enabled}: IProps) => {
    const {data, isLoading, error, isError} = useQuery({
        queryKey: ['userActivity', filters],
        queryFn: () => ptSessionService.getUserActivity(filters),
        enabled: enabled ?? true
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
