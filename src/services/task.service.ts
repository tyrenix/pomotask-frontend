import queryString from 'query-string'
import {axiosWithAuth} from '@/interceptors/axios.interceptor'
import {IFiltersSearchTask, ITask, IUpdateTask} from '@/types/task.types'

class TaskService {
    private readonly PREFIX: string = '/task'

    async getAllTasks(filters: IFiltersSearchTask = {}) {
        const queryParams = queryString.stringify(filters)
        const response = await axiosWithAuth.get<ITask[]>(
            `${this.PREFIX}/list?${queryParams.toString()}`
        )

        return response.data
    }

    async getTaskById(taskId: string) {
        const response = await axiosWithAuth.get<ITask>(
            `${this.PREFIX}/${taskId}`
        )

        return response.data
    }

    async updateTaskById(taskId: string, data: IUpdateTask) {
        const response = await axiosWithAuth.patch<ITask>(
            `${this.PREFIX}/${taskId}`,
            {...data}
        )

        return response.data
    }
}

export const taskService = new TaskService()
