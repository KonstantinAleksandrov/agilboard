import './style.css'
import { FC, PropsWithChildren} from 'react'
import { IProcessColumnProps } from './ProcessColumnProps'
import { useBoardStore } from '../../hooks'
import { observer } from 'mobx-react-lite'
import { Task } from '../Task'
import { IColumn } from '../../types'
import { useDrop } from 'react-dnd'
import { IExtendedTask } from '../../types'
import { IUser } from '../../models'


const ProcessColumn: FC<PropsWithChildren<IProcessColumnProps>> = ({children,columnId}) => {
    const boardStore = useBoardStore()
    const currentColumn = boardStore.getProgressColumnById(columnId) as IColumn

    const [ , dropRef] = useDrop<IExtendedTask>({
        accept: 'card',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if(item.columnId === columnId) {
                return
            }
            boardStore.removeTaskFromProgressColumn(item.id,item.columnId)
            item.index = 0
            item.columnId = currentColumn.id
            boardStore.setTaskInProgressColumnOnGivenPlace(item.id,columnId,boardStore.getHoverTask().index)
        },
    })

    return (
        <div className='column'>
            <div className='column__header'>{children}</div>
            <div className='column__body'>
                <div className='column__body-taskList column__taskList' ref={dropRef}>
                   {currentColumn.tasks.map((task,index)=>{
                        const user = boardStore.getUserColumnById(task.userId) as IUser
                        return (
                            <Task 
                            taskId={task.id} 
                            key={task.id} 
                            taskIndex={index} 
                            userData={
                                {
                                    name: user?.name,
                                    avatar: user.avatar,
                                }
                            }
                            columnType='progress'
                            />
                        )
                   })}
                </div>
            </div>
        </div>
    )
}

export default observer(ProcessColumn)