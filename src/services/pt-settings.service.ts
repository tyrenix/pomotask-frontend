import {axiosWithAuth} from '@/interceptors/axios.interceptor'
import {IPomodoroSettings} from '@/types/pomodoro-settings.types'

class PtSettingsService {
    private readonly PREFIX: string = '/pomodoro-settings'

    async get(): Promise<IPomodoroSettings> {
        const response = await axiosWithAuth.get<IPomodoroSettings>(
            this.PREFIX + '/'
        )
        return response.data
    }
}

export const ptSettingsService = new PtSettingsService()
