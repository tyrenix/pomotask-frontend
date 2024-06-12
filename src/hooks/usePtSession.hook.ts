'use client'

import {ptSessionService} from '@/services/pt-session.service'
import {useQuery} from '@tanstack/react-query'
import {useEffect} from 'react'
import {toast} from 'sonner'

export const usePtSession = (ptSessionId: string) => {
    const {data, error, isSuccess, isLoading} = useQuery({
        queryKey: ['pomodoro-session', ptSessionId],
        queryFn: () => ptSessionService.getById(ptSessionId),
        enabled: !!ptSessionId
    })

    useEffect(() => {
        if (error) {
            toast.error(error as any)
        }
    }, [error])

    return {
        ptSession: data,
        isSuccess,
        isLoading
    }
}
