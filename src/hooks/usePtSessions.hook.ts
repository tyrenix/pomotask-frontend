import {ptSessionService} from '@/services/pt-session.service'
import {IGetListPomodoroSession} from '@/types/pomodoro-session.types'
import {useInfiniteQuery} from '@tanstack/react-query'
import {useEffect} from 'react'
import {toast} from 'sonner'

interface IProps {
    enabled?: boolean
    filters?: IGetListPomodoroSession
}

export const usePtSessions = ({enabled, filters}: IProps) => {
    const {
        data,
        isSuccess,
        isLoading,
        isError,
        error,
        isFetchingNextPage,
        isFetchNextPageError,
        fetchNextPage
    } = useInfiniteQuery({
        queryKey: ['pomodoro-sessions', filters],
        queryFn: ({pageParam}) =>
            ptSessionService.getListSessions({...filters, page: pageParam}),
        getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
            lastPageParam + 1,
        initialPageParam: 0,
        enabled
    })

    useEffect(() => {
        if (error) {
            toast.error(error as any)
        }
    }, [error])

    return {
        ptSessions: data,
        isFetchNextPageError,
        isFetchingNextPage,
        fetchNextPage,
        isSuccess,
        isLoading,
        isError,
        error
    }
}
