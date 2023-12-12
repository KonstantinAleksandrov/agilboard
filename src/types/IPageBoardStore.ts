import { boardTypes } from "./commonTypes"
import { IUsersBoardStore } from './IUsersBoardStore'
import { IProgressBoardStore } from './IProgressBoardStore'
import { ITask } from "../models"
import { IExtendedTask } from "."

export interface IPageBoardStore {
    getBoardTypes: () => boardTypes[]
    getActiveBoard: () => boardTypes
    setActiveBoard: (type: boardTypes) => void
    getUsersBoardStore: ()=> IUsersBoardStore
    getProgressBoardStore: () => IProgressBoardStore
    setDraggingTask: (task: ITask) => void
    removeDraggingTask: () => void
    getDraggingTask: () => ITask
    setHoverTask: (task: IExtendedTask) => void
    removeHoverTask: () => void
    getHoverTask: () => IExtendedTask
}