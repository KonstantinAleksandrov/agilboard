import { ITask } from "../models"

export interface IExtendedTask extends ITask {
    index: number
}

export interface IHoverAboveTaskInsideColumn {
    dragItem: IExtendedTask,
    currentTask: IExtendedTask
    hoverIndex: number,
    element: HTMLDivElement,
    clientOffsetY: number, 
    moveFunction: (dragTask: IExtendedTask, hoverTask: IExtendedTask) => void
}