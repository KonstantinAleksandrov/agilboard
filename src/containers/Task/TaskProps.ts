import { IExtendedTask, ITaskRenderSettings } from "../../types"

export interface ITaskProps {
    taskId: number,
    taskIndex: number
    propertyCheckDifference: 'columnId' | 'userId',
    moveFunction: (dragTask: IExtendedTask, hoverTask: IExtendedTask) => void
    taskRenderSettings: ITaskRenderSettings
}