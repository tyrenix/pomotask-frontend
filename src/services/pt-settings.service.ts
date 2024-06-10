import {axiosWithAuth} from '@/interceptors/axios.interceptor'
import {
    IPomodoroSettings,
    IUpdatePomodoroSettings
} from '@/types/pomodoro-settings.types'

class PtSettingsService {
    private readonly PREFIX: string = '/pomodoro-settings'

    async get(): Promise<IPomodoroSettings> {
        const response = await axiosWithAuth.get<IPomodoroSettings>(
            this.PREFIX + '/'
        )

        return response.data
    }

    async update(data: IUpdatePomodoroSettings): Promise<IPomodoroSettings> {
        const response = await axiosWithAuth.patch<IPomodoroSettings>(
            `${this.PREFIX}/update`,
            {
                ...data
            }
        )

        return response.data
    }
}

export const ptSettingsService = new PtSettingsService()
