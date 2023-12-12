import './style.css'
import { FC, useEffect } from 'react'
import { Column } from '../../containers'
import { ProgressColumnTitle } from '../../components'
import { useRootStore } from '../../hooks'
import { observer } from 'mobx-react-lite'
import { IExtendedTask } from '../../types'

const ProgressBoard: FC = ({ }) => {
   /*  useEffect(() => {
        boardStore.init()
    }, []) */

    /* const boardStore = useRootStore()

    const removeTaskFromColumn = (taskId: number, columnId: number) => {
        boardStore.removeTaskFromProgressColumn(taskId, columnId)
    }

    const setTaskInColumn = (taskId: number, columnId: number) => {
        const hoverTask = boardStore.getHoverTask()
        boardStore.setTaskInProgressColumnOnGivenPlace(taskId, columnId, hoverTask.index)
    }

    const hoverAboveTaskBetweenColumnHandler = (task: IExtendedTask, columnId: number) => {
        if (task.columnId === columnId) {
            return
        }
        removeTaskFromColumn(task.id, task.columnId)
        task.index = 0
        task.columnId = columnId
        setTaskInColumn(task.id, task.columnId)
    } */

    const rootStore = useRootStore()
    const pageBoardStore = rootStore.getPageBoardStore()
    const progressBoardStore = pageBoardStore.getProgressBoardStore()
    const tasksStore = rootStore.getTasksStore()

    const removeTask = (taskId: number, columnId: number) => {
        progressBoardStore.removeTask(taskId, columnId)
    }

    const setTask = (taskId: number, columnId: number) => {
        const hoverTask = pageBoardStore.getHoverTask()
        const currentTask = tasksStore.getTaskById(taskId)

        if (currentTask) {
            progressBoardStore.setTaskOnGivenPlace(currentTask, columnId, hoverTask.index)
        }
    }

    const hoverAboveTaskBetweenColumnHandler = (task: IExtendedTask, columnId: number) => {
        if (task.columnId === columnId) {
            return
        }
        removeTask(task.id, task.columnId)
        task.index = 0
        task.columnId = columnId
        setTask(task.id, task.columnId)
    }
    
    const moveTaskInsideColumn = (dragTask: IExtendedTask, hoverTask: IExtendedTask) => {
        progressBoardStore.moveTaskInsideColumn(dragTask,hoverTask)
    }

    useEffect(() => {
        progressBoardStore.init(rootStore.getTasksStore().getTasks())
    }, [])

        return (
            <div className='progressBoard'>
                {progressBoardStore.getColumns().map((column) => {
                    return (
                        <Column
                            columnId={column.id}
                            key={column.id}
                            tasks={column.tasks}
                            hoverHandler={hoverAboveTaskBetweenColumnHandler}
                            propertyCheckDifference='columnId'
                            moveFunction={moveTaskInsideColumn}
                            taskRenderSettings={progressBoardStore.getTaskRenderSettings()}

                        >
                            <ProgressColumnTitle title={column.title} taskNumber={column.tasks.length || 0} />
                        </Column>
                    )
                })}
            </div>
        )
    }

    export default observer(ProgressBoard)