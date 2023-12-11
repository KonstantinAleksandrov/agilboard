import './style.css'
import { FC , useEffect} from 'react'
import { UserColumn, Column } from '../../containers'
import { observer } from 'mobx-react-lite'
import { useBoardStore } from '../../hooks'
import { UserColumnTitle } from '../UserColumnTitle'
import { IExtendedTask } from '../../types'

const UsersBoard: FC = ({}) => {
    useEffect(()=>{
        boardStore.init()
    },[])

    const boardStore = useBoardStore()

    const removeTaskFromColumn = (taskId: number,columnId: number) => {
        boardStore.removeTaskFromUserColumn(taskId,columnId) 
    }

    const setTaskInColumn = (taskId: number,columnId: number) => {
        const hoverTask = boardStore.getHoverTask()
        boardStore.setTaskInUserColumnOnGivenPlace(taskId,columnId,hoverTask.index)
    }

    const hoverAboveTaskBetweenColumnHandler = (task: IExtendedTask,columnId: number) => {
        if(task.userId === columnId) {
            return
        }
        removeTaskFromColumn(task.id,task.userId)
        task.index = 0
        task.userId = columnId
        setTaskInColumn(task.id,columnId)
    }


    return (
        <div className='usersBoard'>
           {boardStore.getUsersColumns().map((column)=>{
                return (
                   /*  <UserColumn userId={column.id} key={column.id}>
                        <UserColumnTitle 
                            taskNumber={column.tasks.length || 0} 
                            avatar={column.avatar} 
                            fullName={column.name}
                        />
                    </UserColumn> */
                    <Column 
                    tasks={column.tasks}
                    columnId={column.id}
                    hoverHandler={hoverAboveTaskBetweenColumnHandler}
                    boardType='user'
                    key={column.id}
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