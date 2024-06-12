import {toast} from 'sonner'
import {useEffect} from 'react'
import {useQuery} from '@tanstack/react-query'
import {userService} from '@/services/user.service'
import {envConstant} from '@/constants/env.constant'

export const useUser = () => {
    const {data, isLoading, error, isError} = useQuery({
        queryKey: ['profile'],
        queryFn: () => userService.getUser()
    })

    useEffect(() => {
        if (error) {
            toast.error(error as any)
        }
    }, [error])

    return {user: data, isLoading, isError, error}
}
