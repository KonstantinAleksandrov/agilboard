interface IUserData {
    name: string,
    avatar?: string
}

export interface ITaskProps {
    taskId: number,
    columnName?: string,
    userData?: IUserData
    taskIndex: number
    columnType: 'progress' | 'user'
}