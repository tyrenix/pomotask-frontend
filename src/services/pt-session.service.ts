import {axiosWithAuth} from '@/interceptors/axios.interceptor'
import {IPomodoroSession} from '@/types/pomodoro-session.types'

class PtSessionService {
    private readonly PREFIX: string = '/pomodoro-session'

    async getUserActivity() {
        const response = await axiosWithAuth.get<any>(
            this.PREFIX + '/activity/?type=week'
        )
        return response.data
    }

    async getListSessions() {
        const response = await axiosWithAuth.get<IPomodoroSession[]>(
            this.PREFIX + '/list'
        )
        return response.data
    }
}

export const ptSessionService = new PtSessionService()
