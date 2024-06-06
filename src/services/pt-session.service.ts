import queryString from 'query-string'
import {axiosWithAuth} from '@/interceptors/axios.interceptor'
import {
    IActivityFiltersPomodoroSession,
    IGetListPomodoroSession,
    IPomodoroSession
} from '@/types/pomodoro-session.types'

class PtSessionService {
    private readonly PREFIX: string = '/pomodoro-session'

    async getById(ptSessionId: string) {}

    async getUserActivity(filters: IActivityFiltersPomodoroSession) {
        const queryParams = queryString.stringify(filters)
        const response = await axiosWithAuth.get<{activity: number}>(
            this.PREFIX + `/activity/?${queryParams.toString()}`
        )
        return response.data
    }

    async getListSessions(filters?: IGetListPomodoroSession) {
        const queryParams = queryString.stringify(filters || {})
        const response = await axiosWithAuth.get<IPomodoroSession[]>(
            this.PREFIX + `/list?${queryParams.toString()}`
        )
        return response.data
    }
}

export const ptSessionService = new PtSessionService()
