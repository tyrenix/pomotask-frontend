import {toast} from 'sonner'
import {useQuery} from '@tanstack/react-query'
import {useEffect} from 'react'
import {sessionService} from '@/services/session.service'

export const useSession = (sessionId: string) => {
    const {data, error, isSuccess, isLoading} = useQuery({
        queryKey: ['sessions'],
        queryFn: () => sessionService.getList(),
        enabled: !!sessionId
    })

    useEffect(() => {
        if (error) {
            toast.error(error as any)
        }
    }, [error])

    return {
        session: data?.[sessionId],
        isSuccess,
        isLoading
    }
}
