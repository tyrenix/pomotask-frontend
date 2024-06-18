import {axiosWithAuth} from '@/interceptors/axios.interceptor'
import {
    IActivityFiltersPomodoroSession,
    IGetListPomodoroSession,
    IPomodoroSession
} from '@/types/pomodoro-session.types'
import queryString from 'query-string'

class PtSessionService {
    private readonly PREFIX: string = '/pomodoro-session'

    async getById(ptSessionId: string) {
        const response = await axiosWithAuth.get<IPomodoroSession>(
            this.PREFIX + `/${ptSessionId}`
        )
        return response.data
    }

    async getUserActivity(filters?: IActivityFiltersPomodoroSession) {
        const queryParams = queryString.stringify(filters || {})
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

    async getActive() {
        const response = await axiosWithAuth.get<IPomodoroSession | undefined>(
            `${this.PREFIX}/active`
        )

        return response.data || null
    }

    async create(taskId?: string) {
        const response = await axiosWithAuth.post<IPomodoroSession>(
            `${this.PREFIX}/create`,
            {taskId}
        )

        return response.data
    }

    async pauseOrStart(id: string) {
        const response = await axiosWithAuth.patch<IPomodoroSession>(
            `${this.PREFIX}/pause`,
            {id}
        )

        return response.data
    }

    async completion(id: string) {
        const response = await axiosWithAuth.patch<IPomodoroSession>(
            `${this.PREFIX}/completion`,
            {id}
        )

        return response.data
    }

    async delete(id: string) {
        const response = await axiosWithAuth.delete<{success: true}>(
            `${this.PREFIX}/${id}`
        )

        return response.data
    }

    async upcoming() {
        const response = await axiosWithAuth.get<IPomodoroSession['type'][]>(
            `${this.PREFIX}/upcoming`
        )

        return response.data
    }
}

export const ptSessionService = new PtSessionService()
