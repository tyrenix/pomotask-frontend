export interface ITask {
    id: string
    title: string
    description?: string
    isCompleted: boolean
    index: number
    createdAt: Date
    updatedAt: Date
}

export interface IUpdateTask {
    title?: string
    description?: string
    isCompleted?: boolean
    index?: number
}

export interface ICreateTask {
    title: string
    description?: string
}

export interface IFiltersSearchTask {
    isCompleted?: boolean
}
