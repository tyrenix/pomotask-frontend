import {toast} from 'sonner'
import {useEffect} from 'react'
import {useQuery} from '@tanstack/react-query'
import {sessionService} from '@/services/session.service'

export const useSession = (sessionId: string) => {
    const {data, error, isSuccess, isLoading} = useQuery({
        queryKey: ['sessions', sessionId],
        queryFn: () => sessionService.getById(sessionId),
        enabled: !!sessionId
    })

    useEffect(() => {
        if (error) {
            toast.error(error as any)
        }
    }, [error])

    return {
        session: data,
        isSuccess,
        isLoading
    }
}
