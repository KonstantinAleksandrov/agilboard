import { ITask } from "../models"

export interface ITasksStore {
    getTasks: () => ITask[]
    getTaskById: (id: number) => ITask | undefined 
}