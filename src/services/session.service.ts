import {axiosWithAuth} from '@/interceptors/axios.interceptor'
import {ISession} from '@/types/session.types'
import {removeTokens} from './auth-token.service'

class SessionService {
    private readonly PREFIX: string = '/session'

    async getById(sessionId: string) {
        const response = await axiosWithAuth.get<ISession>(
            `${this.PREFIX}/${sessionId}`
        )

        return response.data
    }

    async getList() {
        const response = await axiosWithAuth.get<Record<string, ISession>>(
            `${this.PREFIX}/list`
        )

        return response.data
    }

    async closeSession(sessionId: string) {
        const response = await axiosWithAuth.delete<{success: true}>(
            `${this.PREFIX}/close`,
            {
                data: {sessionId}
            }
        )

        return response.data
    }

    async closeAll() {
        const response = await axiosWithAuth.delete<{success: true}>(
            `${this.PREFIX}/closeAll`
        )

        if (response?.data) {
            removeTokens()
        }

        return response.data
    }
}

export const sessionService = new SessionService()
