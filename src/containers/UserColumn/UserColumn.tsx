import './style.css'
import { FC, PropsWithChildren} from 'react'
import { IUserColumnProps } from './UserColumnProps'
import { useBoardStore } from '../../hooks'
import { observer } from 'mobx-react-lite'
import { Task } from '../Task'
import { useDrop } from 'react-dnd'
import { IExtendedTask } from '../../types'
import { IUser } from '../../models'


const UserColumn: FC<PropsWithChildren<IUserColumnProps>> = ({children,userId}) => {
    const boardStore = useBoardStore()
    const currentColumn = boardStore.getUserColumnById(userId) as IUser

    const [ , dropRef] = useDrop<IExtendedTask>({
        accept: 'card',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if(item.userId === userId) {
                return
            }
            boardStore.removeTaskFromUserColumn(item.id,item.userId)
            item.index = 0
            item.userId = currentColumn.id
            boardStore.setTaskInUserColumnOnFirstPlace(item.id,userId)
        },
    })

    return (
        <div className='column'>
            <div className='column__header'>{children}</div>
            <div className='column__body'>
                <div className='column__body-taskList column__taskList' ref={dropRef}>
                   {currentColumn.tasks.map((task,index)=>{
                        return (
                            <Task 
                                taskId={task.id} 
                                key={task.id} 
                                columnName={boardStore.getProgressColumnById(task.columnId)?.title} 
                                taskIndex={index}
                                columnType='user'
                            />
                        )
                   })}
                </div>
            </div>
        </div>
    )
}

export default observer(UserColumn)