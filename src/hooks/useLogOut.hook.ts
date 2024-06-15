'use client'

import {dashboardConstant} from '@/constants/dashboard.constant'
import {authService} from '@/services/auth.service'
import {useMutation} from '@tanstack/react-query'
import {useRouter} from 'next/navigation'
import {toast} from 'sonner'

export const useLogout = () => {
    const router = useRouter()

    const mutation = useMutation({
        mutationKey: ['log-out'],
        mutationFn: () => authService.logout(),
        onError(error) {
            toast.error(error as unknown as string)
        },
        onSuccess() {
            toast.success('Success log out!')
            router.push(dashboardConstant.AUTH_PAGE)
        }
    })

    return mutation
}
