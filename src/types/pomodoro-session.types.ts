export type TPomodoroSession = 'work' | 'shortBreak' | 'longBreak'
export interface IPomodoroSession {
    id: string
    taskId: string
    totalSeconds: number
    completedSeconds: number
    isCompleted: boolean
    isPaused: boolean
    type: TPomodoroSession
    completionTime: Date
    createdAt: Date
}

export interface IUpdatePomodoroSession {
    id: string
}

export interface IGetListPomodoroSession {
    taskId?: string
    limit?: number
    page?: number
    isCompleted?: boolean
}

export interface ICreatePomodoroSession
    extends Partial<Pick<IPomodoroSession, 'taskId'>> {}

export interface IActivityFiltersPomodoroSession {
    taskId?: string
    filter?: 'day' | 'week' | 'total'
}
