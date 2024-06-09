class SelectTaskService {
    private readonly SELECT_TASK_NAME: string = 'select-task'

    select(taskId: string | undefined): void {
        if (!taskId) {
            localStorage.removeItem(this.SELECT_TASK_NAME)
            return
        }

        localStorage.setItem(this.SELECT_TASK_NAME, taskId)
    }

    get(): string | undefined {
        return localStorage.getItem(this.SELECT_TASK_NAME) || undefined
    }
}

export const selectTaskService = new SelectTaskService()
