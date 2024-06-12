import {axiosWithAuth} from '@/interceptors/axios.interceptor'
import {
    ICreateTask,
    IFiltersSearchTask,
    ITask,
    IUpdateTask
} from '@/types/task.types'
import queryString from 'query-string'

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

    async createTask(data: ICreateTask) {
        const response = await axiosWithAuth.post<ICreateTask>(
            `${this.PREFIX}/create`,
            data
        )

        return response.data
    }

    async updateIndex(tasksIds: string[]) {
        const response = await axiosWithAuth.patch<{success: true}>(
            `${this.PREFIX}/update-index`,
            {tasksIds}
        )

        return response.data
    }
}

export const taskService = new TaskService()
