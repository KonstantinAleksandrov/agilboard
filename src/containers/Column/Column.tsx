import './style.css'
import { FC, PropsWithChildren} from 'react'
import { IColumnProps } from './ColumnProps'
import { useBoardStore } from '../../hooks'
import { observer } from 'mobx-react-lite'
import { Task } from '../Task'
import { IColumn } from '../../types'


const Column: FC<PropsWithChildren<IColumnProps>> = ({children,columnId}) => {
    const boardStore = useBoardStore()
    const currentColumn = boardStore.getProgressColumnById(columnId) as IColumn

    return (
        <div className='column'>
            <div className='column__header'>{children}</div>
            <div className='column__body'>
                <div className='column__body-taskList column__taskList'>
                   {boardStore.getTasks().map((task)=>{
                        if(task.columnId === columnId) {
                            return (
                                <Task taskId={task.id} key={task.id} columnName={currentColumn.title}/>
                            )
                        }
                   })}
                </div>
            </div>
        </div>
    )
}

export default observer(Column)