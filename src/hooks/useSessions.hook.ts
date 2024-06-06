import {toast} from 'sonner'
import {useQuery} from '@tanstack/react-query'
import {useEffect} from 'react'
import {sessionService} from '@/services/session.service'

export const useSessions = () => {
    const {data, error, isSuccess, isLoading} = useQuery({
        queryKey: ['sessions'],
        queryFn: () => sessionService.getList()
    })

    useEffect(() => {
        if (error) {
            toast.error(error as any)
        }
    }, [error])

    return {
        sessions: data,
        isSuccess,
        isLoading
    }
}
