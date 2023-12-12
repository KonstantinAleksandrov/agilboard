import { ITask } from "../../models"
import { IExtendedTask, ITaskRenderSettings } from "../../types"

export interface IColumnProps {
    tasks: ITask[]
    hoverHandler: (task: IExtendedTask,columnId: number) => void
    columnId: number
    propertyCheckDifference: 'columnId' | 'userId',
    moveFunction: (dragTask: IExtendedTask, hoverTask: IExtendedTask) => void
    taskRenderSettings: ITaskRenderSettings
}