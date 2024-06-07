import {toast} from 'sonner'
import {useEffect} from 'react'
import {useQuery} from '@tanstack/react-query'
import {
    IGetListPomodoroSession,
    IPomodoroSession
} from '@/types/pomodoro-session.types'
import {ptSessionService} from '@/services/pt-session.service'

interface IProps {
    enabled?: boolean
    filters?: IGetListPomodoroSession
}

export const usePtSessions = ({enabled, filters}: IProps) => {
    const {data, isLoading, error, isError} = useQuery<IPomodoroSession[]>({
        queryKey: [
            'pomodoro-sessions',
            filters?.isCompleted,
            filters?.limit,
            filters?.page,
            filters?.taskId
        ],
        queryFn: () => ptSessionService.getListSessions(filters),
        enabled
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
