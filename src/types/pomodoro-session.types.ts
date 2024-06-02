export type TPomodoroSession = 'work' | 'shortBreak' | 'longBreak'
export interface IPomodoroSession {
    id: string
    taskId: string
    totalSeconds: number
    isCompleted: boolean
    isPaused: boolean
    type: TPomodoroSession
}

export interface IUpdatePomodoroSession
    extends Partial<
        Pick<IPomodoroSession, 'totalSeconds' | 'isCompleted' | 'isPaused'>
    > {}

export interface IGetListPomodoroSession {
    taskId?: string
    limit?: number
    page?: number
    isCompleted?: boolean
}

export interface ICreatePomodoroSession
    extends Partial<Pick<IPomodoroSession, 'taskId' | 'type'>> {}
