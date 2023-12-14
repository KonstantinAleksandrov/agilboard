import './style.css'
import { FC, useEffect } from 'react'
import { Column } from '..'
import { ProgressColumnTitle } from '../../components'
import { useRootStore } from '../../hooks'
import { observer } from 'mobx-react-lite'
import { IExtendedTask } from '../../types'

// доска прогресса задач 
const ProgressBoard: FC = ({ }) => {
    const rootStore = useRootStore() // корневой стор
    const pageBoardStore = rootStore.getPageBoardStore() // стор страницы с досками
    const progressBoardStore = pageBoardStore.getProgressBoardStore() // стор доски прогресса
    const tasksStore = rootStore.getTasksStore() // стор задач

    // удаляем задачу из колонки 
    const removeTask = (taskId: number, columnId: number) => {
        progressBoardStore.removeTask(taskId, columnId)
    }

    // добавляем задачу в колонку
    const setTask = (taskId: number, columnId: number) => {
        const hoverTask = pageBoardStore.getHoverTask()
        const currentTask = tasksStore.getTaskById(taskId)

        if (currentTask) {
            progressBoardStore.setTaskOnGivenPlace(currentTask, columnId, hoverTask.index)
        }
    }

    // функция работает когда задача из одной колонки нависает на другой колонкой 
    const hoverAboveTaskBetweenColumnHandler = (task: IExtendedTask, columnId: number) => {
        if (task.columnId === columnId) {
            return
        }
        removeTask(task.id, task.columnId)
        task.index = 0
        task.columnId = columnId
        setTask(task.id, task.columnId)
    }
    
    // меняем местами задачи внутри одной колонки 
    const moveTaskInsideColumn = (dragTask: IExtendedTask, hoverTask: IExtendedTask) => {
        progressBoardStore.moveTaskInsideColumn(dragTask,hoverTask)
    }

    // заполняем колонки задачами
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