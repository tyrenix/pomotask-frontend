'use client'

import {dashboardConstant} from '@/constants/dashboard.constant'
import {sessionService} from '@/services/session.service'
import {useMutation} from '@tanstack/react-query'
import {useRouter} from 'next/navigation'
import {toast} from 'sonner'

export const useSessionCloseAll = () => {
    const router = useRouter()

    const mutation = useMutation({
        mutationKey: ['session-close', 'all'],
        mutationFn: () => sessionService.closeAll(),
        onError(error) {
            toast.error(error as unknown as string)
        },
        onSuccess() {
            toast.success('Success close all sessions!')
            router.push(dashboardConstant.AUTH_PAGE)
        }
    })

    return mutation
}
