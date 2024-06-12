import {toast} from 'sonner'
import {useEffect} from 'react'
import {useQuery} from '@tanstack/react-query'
import {IPomodoroSettings} from '@/types/pomodoro-settings.types'
import {ptSettingsService} from '@/services/pt-settings.service'

export const usePtSettings = () => {
    const {data, isLoading, error, isError} = useQuery<IPomodoroSettings>({
        queryKey: ['pomodoro-settings'],
        queryFn: () => ptSettingsService.get()
    })

    useEffect(() => {
        if (error) {
            toast.error(error as any)
        }
    }, [error])

    return {
        ptSettings: data,
        isLoading,
        isError,
        error
    }
}
