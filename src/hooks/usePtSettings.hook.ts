import {toast} from 'sonner'
import {useEffect} from 'react'
import {useQuery} from '@tanstack/react-query'
import {IPomodoroSettings} from '@/types/pomodoro-settings.types'

export const usePtSettings = () => {
    const {data, isLoading, error, isError} = useQuery<IPomodoroSettings>({
        queryKey: ['pomodoro-settings'],
        queryFn: () => ({
            workingTime: 28800,
            length: 100,
            longBreak: 100,
            shortBreak: 100,
            longBreakFrequency: 3
        })
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
