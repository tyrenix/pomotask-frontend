import {axiosWithAuth} from '@/interceptors/axios.interceptor'
import {IPomodoroSettings} from '@/types/pomodoro-settings.types'

class PtSessionService {
    private readonly PREFIX: string = '/pomodoro-settings'

    async getUserActivity(): Promise<IPomodoroSettings> {
        const response = await axiosWithAuth.get<IPomodoroSettings>(
            this.PREFIX + '/'
        )
        return response.data
    }
}

export const ptSessionService = new PtSessionService()
