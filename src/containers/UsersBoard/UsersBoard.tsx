import './style.css'
import { FC , useEffect} from 'react'
import { Column } from '..'
import { observer } from 'mobx-react-lite'
import { useRootStore } from '../../hooks'
import { UserColumnTitle } from '../../components/UserColumnTitle'
import { IExtendedTask } from '../../types'


// доска с фильтрацией задач по пользователям
const UsersBoard: FC = ({}) => {
    const rootStore = useRootStore()  // корневой стор
    const pageBoardStore = rootStore.getPageBoardStore() // стор страницы с досками
    const userBoardStore = pageBoardStore.getUsersBoardStore() // стор колонок с фильтрацией по пользователям
    const tasksStore = rootStore.getTasksStore() // стор задач

     // удаляем задачу из колонки 
    const removeTask = (taskId: number, columnId: number) => {
        userBoardStore.removeTask(taskId, columnId)
    }

    // добавляем задачу в колонку
    const setTask = (taskId: number, columnId: number) => {
        const hoverTask = pageBoardStore.getHoverTask()
        const currentTask = tasksStore.getTaskById(taskId)

        if (currentTask) {
            userBoardStore.setTaskOnGivenPlace(currentTask, columnId, hoverTask.index)
        }
    }

     // функция работает когда задача из одной колонки нависает на другой колонкой 
    const hoverAboveTaskBetweenColumnHandler = (task: IExtendedTask, columnId: number) => {
        if (task.userId === columnId) {
            return
        }
        removeTask(task.id, task.userId)
        task.index = 0
        task.userId = columnId
        setTask(task.id, task.userId)
    }
    
    // меняем местами задачи внутри одной колонки 
    const moveTaskInsideColumn = (dragTask: IExtendedTask, hoverTask: IExtendedTask) => {
        userBoardStore.moveTaskInsideColumn(dragTask,hoverTask)
    }

     // заполняем колонки задачами
    useEffect(() => {
        userBoardStore.init(rootStore.getTasksStore().getTasks())
    }, [])


    return (
        <div className='usersBoard'>
           {userBoardStore.getColumns().map((column)=>{
                return (
                    <Column 
                    columnId={column.id}
                    key={column.id}
                    tasks={column.tasks}
                    hoverHandler={hoverAboveTaskBetweenColumnHandler}
                    propertyCheckDifference='userId'
                    moveFunction={moveTaskInsideColumn}
                    taskRenderSettings={userBoardStore.getTaskRenderSettings()}
                    >
                        <UserColumnTitle 
                            taskNumber={column.tasks.length || 0} 
                            avatar={column.avatar} 
                            fullName={column.name}
                        />
                    </Column>
                )
           })}
        </div>
    )
}

export default observer(UsersBoard)