import './style.css'
import { FC, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { ITaskProps } from './TaskProps'
import { useBoardStore } from '../../hooks'
import { users } from '../../data'
import { IUser, ITask } from '../../models'
import anonimAvatar from '../../images/anonimAvatar.svg'
import { useDrag, useDrop } from 'react-dnd'
import { hoverAboveTask } from '../../utils'
import { IExtendedTask } from '../../types'

const Task: FC<ITaskProps> = ({taskId,columnName,taskIndex}) => {
    const boardStore = useBoardStore()
    const ref = useRef<HTMLDivElement>(null)
    const currentTask = boardStore.getTaskById(taskId) as ITask
    const currentUser = users.find((user)=> user.id === currentTask.userId) as IUser

    const [{ isDragging }, drag] = useDrag({
        type: 'card',
        item: {...currentTask,index: taskIndex},
        collect: (monitor: any) => ({
          isDragging: monitor.isDragging(),
        }),
    })

    const [ , drop] = useDrop<IExtendedTask>({
        accept: 'card',
        collect(monitor) {
        return {
            handlerId: monitor.getHandlerId(),
        }
        },
        hover(item: IExtendedTask, monitor) {
            if (!ref.current) {
                return
            }

            if(item.columnId !== currentTask.columnId) {
                return 
            }

            const options = {
                dragItem: item,
                hoverIndex: taskIndex,
                element: ref.current,
                clientOffsetY: monitor.getClientOffset()?.y as number,
                moveFunction: boardStore.moveTaskInsideColumn.bind(boardStore,item, { ...currentTask, index: taskIndex })
            }

            hoverAboveTask(options)
        },
  })

    drag(drop(ref))

    return (
        <div className='task' ref={ref} style={{opacity: isDragging ? 0 : 1}}>
            <div className='task__description'>{currentTask.description}</div>
            <div className='task__footer'>
                <div className='task__footer-column'>{columnName}</div>
                <div className='task__footer-user task__user'>
                    <div className='task__user-name'>{currentUser.name}</div>
                    <div className='task__user-avatar'>
                        <img src={currentUser.avatar ? currentUser.avatar : anonimAvatar} alt="userAvatar" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default observer(Task)