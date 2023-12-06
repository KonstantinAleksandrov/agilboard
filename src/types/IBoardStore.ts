import { boardTypes } from "./commonTypes"
import { IColumn } from "./IColumn"
import { ITask, IUser } from "../models"
import { IExtendedTask } from './dndTypes'

export type columnType = 'user' | 'progress'
export interface IBoardStore {
    getBoardTypes: () => boardTypes[]
    getProgressColumns: () => IColumn[]
    getTasks: () => ITask[]
    getTaskById: (id: number) => ITask | undefined 
    getProgressColumnById: (id: number) => IColumn | undefined
    getUserColumnById: (id: number) => IUser | undefined
    setTaskInProgressColumn: (task: ITask) => void
    setTaskInUserColumn: (task: ITask) => void
    init: () => void
    removeTaskFromProgressColumn: (taskId: number, columnId: number) => void
    removeTaskFromUserColumn: (taskId: number, columnId: number) => void
    moveTaskInsideProgressColumn: (dragTask: IExtendedTask, hoverTask: IExtendedTask) => void
    moveTaskInsideUserColumn: (dragTask: IExtendedTask, hoverTask: IExtendedTask) => void
    setTaskInProgressColumnOnGivenPlace: (dragTaskId: number, hoverColumnId: number, index: number) => void
    setTaskInUserColumnOnGivenPlace: (dragTaskId: number, hoverColumnId: number,index: number) => void
    setDraggingTask: (task: ITask) => void
    removeDraggingTask: () => void
    getDraggingTask: () => ITask
    getUsersColumns: () => IUser[]
    setHoverTask: (task: IExtendedTask) => void
    removeHoverTask: () => void
    getHoverTask: () => IExtendedTask
}