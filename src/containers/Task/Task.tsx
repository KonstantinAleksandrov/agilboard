import './style.css'
import { FC, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { ITaskProps } from './TaskProps'
import { useBoardStore } from '../../hooks'
import { ITask } from '../../models'
import anonimAvatar from '../../images/anonimAvatar.svg'
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd'
import { hoverAboveTaskInsideColumn } from '../../utils'
import { IExtendedTask, IHoverAboveTaskInsideColumn } from '../../types'

const Task: FC<ITaskProps> = ({taskId,columnName,taskIndex,userData,columnType}) => {
    const boardStore = useBoardStore()
    const ref = useRef<HTMLDivElement>(null)
    const currentTask = boardStore.getTaskById(taskId) as ITask

    const getDropOptions = (dragTask: IExtendedTask,monitor: DropTargetMonitor<IExtendedTask>) => {
        if(columnType === 'progress') {
            if(dragTask.columnId !== currentTask.columnId) {
                return 
            }

            return {
                dragItem: dragTask,
                hoverIndex: taskIndex,
                element: ref.current,
                clientOffsetY: monitor.getClientOffset()?.y as number,
                moveFunction: boardStore.moveTaskInsideProgressColumn.bind(boardStore, dragTask, { ...currentTask, index: taskIndex })
            } as IHoverAboveTaskInsideColumn

        }else if (columnType === 'user') {
            if(dragTask.userId !== currentTask.userId) {
                return
            }

            return {
                dragItem: dragTask,
                hoverIndex: taskIndex,
                element: ref.current,
                clientOffsetY: monitor.getClientOffset()?.y as number,
                moveFunction: boardStore.moveTaskInsideUserColumn.bind(boardStore, dragTask, { ...currentTask, index: taskIndex })
            } as IHoverAboveTaskInsideColumn
        }
    }

    const [ , drag] = useDrag({
        type: 'card',
        item: {...currentTask,index: taskIndex},
        collect: (monitor) => {
            const isDragging = monitor.isDragging()
            if (isDragging) {
                boardStore.setDraggingTask(currentTask)
            }
            return monitor.isDragging()
        },
        end: () => {
            boardStore.removeDraggingTask()
        }
    })

    const [, drop] = useDrop<IExtendedTask>({
        accept: 'card',
        collect: (monitor) => monitor.getHandlerId(),
        hover(item: IExtendedTask, monitor) {
            if (!ref.current) {
                return
            }

            boardStore.setHoverTask({ ...currentTask, index: taskIndex })

            const options = getDropOptions(item,monitor)
            
            if (options) {
                hoverAboveTaskInsideColumn(options)
            }

        },
  })

    drag(drop(ref))

    return (
        <div className='task' ref={ref} style={{opacity: boardStore.getDraggingTask().id == taskId ? 0 : 1}}>
            <div className='task__description'>{currentTask.description}</div>
            <div className='task__footer'>
                {columnName && <div className='task__footer-column'>{columnName}</div>}
                {userData && <div className='task__footer-user task__user'>
                    <div className='task__user-name'>{userData.name}</div>
                    <div className='task__user-avatar'>
                        <img src={userData.avatar ? userData.avatar : anonimAvatar} alt="userAvatar" />
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default observer(Task)