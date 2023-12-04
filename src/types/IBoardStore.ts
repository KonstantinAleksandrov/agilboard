import { boardTypes } from "./commonTypes"
import { IColumn } from "./IColumn"
import { ITask } from "../models"
import { IExtendedTask } from './dndTypes'
export interface IBoardStore {
    getBoardTypes: () => boardTypes[]
    getProgressColumns: () => IColumn[]
    getTasks: () => ITask[]
    getTaskById: (id: number) => ITask | undefined 
    getProgressColumnById: (id: number) => IColumn | undefined
    setTaskInColumn: (task: ITask) => void
    init: () => void
    removeTask: (taskId: number, columnId: number) => void
    moveTaskInsideColumn: (dragTask: IExtendedTask, hoverTask: IExtendedTask) => void
}