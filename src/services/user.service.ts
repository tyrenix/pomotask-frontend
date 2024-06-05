import {IUser} from '@/types/user.types'
import {axiosWithAuth} from '@/interceptors/axios.interceptor'

class UserService {
    private readonly PREFIX: string = '/user'

    async getUser(): Promise<IUser> {
        const response = await axiosWithAuth.get<IUser>(this.PREFIX)
        return response.data
    }
}

export const userService = new UserService()
