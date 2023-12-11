import { ITask } from "../../models"
import { IExtendedTask } from "../../types"

export interface IColumnProps {
    tasks: ITask[],
    hoverHandler: (task: IExtendedTask,columnId: number) => void
    columnId: number
    boardType: 'progress' | 'user'
}