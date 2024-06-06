import {toast} from 'sonner'
import {useEffect} from 'react'
import {useQuery} from '@tanstack/react-query'
import {
    IGetListPomodoroSession,
    IPomodoroSession
} from '@/types/pomodoro-session.types'
import {ptSessionService} from '@/services/pt-session.service'

export const usePtSessions = (filters?: IGetListPomodoroSession) => {
    const {data, isLoading, error, isError} = useQuery<IPomodoroSession[]>({
        queryKey: ['pomodoro-sessions'],
        queryFn: () => ptSessionService.getListSessions(filters)
    })

    useEffect(() => {
        if (error) {
            toast.error(error as any)
        }
    }, [error])

    return {
        ptSessions: data,
        isLoading,
        isError,
        error
    }
}
