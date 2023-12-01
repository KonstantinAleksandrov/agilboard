import { boardTypes } from "./commonTypes"
import { IColumn } from "./IColumn"
import { ITask } from "../models"

export interface IBoardStore {
    getBoardTypes: () => boardTypes[]
    getProgressColumns: () => IColumn[]
    getTasks: () => ITask[]
    getTaskById: (id: number) => ITask | undefined 
    getProgressColumnById: (id: number) => IColumn | undefined 
    incrementTaskCounter: (columnId: number) => void
    decrementTaskCounter: (columnId: number) => void
    setTaskCounter: () => void
}