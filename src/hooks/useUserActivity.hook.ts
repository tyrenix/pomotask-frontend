import {toast} from 'sonner'
import {useEffect} from 'react'
import {useQuery} from '@tanstack/react-query'
import {ptSessionService} from '@/services/pt-session.service'

export const useUserActivity = () => {
    const {data, isLoading, error, isError} = useQuery<{
        total: number
        today: number
        week: number
    }>({
        queryKey: ['userActivity'],
        queryFn: () => ({total: 725131, today: 62712, week: 99712}) //ptSessionService.getUserActivity()
    })

    useEffect(() => {
        if (error) {
            toast.error(error as any)
        }
    }, [error])

    return {
        activity: data,
        isLoading,
        isError,
        error
    }
}
