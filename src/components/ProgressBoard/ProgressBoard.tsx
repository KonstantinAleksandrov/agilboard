import './style.css'
import { FC , useEffect} from 'react'
import { ProcessColumn, Column } from '../../containers'
import { ProgressColumnTitle } from '../../components'
import { useBoardStore } from '../../hooks'
import { observer } from 'mobx-react-lite'
import { IExtendedTask } from '../../types'

const ProgressBoard: FC = ({}) => {
    useEffect(()=>{
        boardStore.init()
    },[])

    const boardStore = useBoardStore()

    const removeTaskFromColumn = (taskId: number,columnId: number) => {
        boardStore.removeTaskFromProgressColumn(taskId,columnId) 
    }

    const setTaskInColumn = (taskId: number,columnId: number) => {
        const hoverTask = boardStore.getHoverTask()
        boardStore.setTaskInProgressColumnOnGivenPlace(taskId,columnId,hoverTask.index)
    }

    const hoverAboveTaskBetweenColumnHandler = (task: IExtendedTask,columnId: number) => {
        if(task.columnId === columnId) {
            return
        }
        removeTaskFromColumn(task.id,task.columnId)
        task.index = 0
        task.columnId = columnId
        setTaskInColumn(task.id,task.columnId)
    }



    return (
        <div className='progressBoard'>
            {boardStore.getProgressColumns().map((column)=>{
                return (
                   /*  <ProcessColumn key={column.id} columnId={column.id}>
                        <ProgressColumnTitle title={column.title} taskNumber={column.tasks.length || 0}/>
                    </ProcessColumn> */
                    <Column
                    columnId={column.id}
                    key={column.id}
                    tasks={column.tasks}
                    hoverHandler={hoverAboveTaskBetweenColumnHandler}
                    boardType="progress"

                    >
                        <ProgressColumnTitle title={column.title} taskNumber={column.tasks.length || 0}/>
                    </Column>
                )
            })}
        </div>
    )
}

export default observer(ProgressBoard)