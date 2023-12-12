import './style.css'
import { FC, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { ITaskProps } from './TaskProps'
import { useRootStore } from '../../hooks'
import { ITask, IUser } from '../../models'
import anonimAvatar from '../../images/anonimAvatar.svg'
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd'
import { hoverAboveTaskInsideColumn } from '../../utils'
import { IExtendedTask, IHoverAboveTaskInsideColumn } from '../../types'

const Task: FC<ITaskProps> = (props) => {
    const {
        taskId,
        taskIndex,
        moveFunction,
        propertyCheckDifference,
        taskRenderSettings
    } = props
    
    const ref = useRef<HTMLDivElement>(null)
    const rootStore = useRootStore()
    const tasksStore = rootStore.getTasksStore()
    const pageBoardStore = rootStore.getPageBoardStore()
    const currentTask = tasksStore.getTaskById(taskId) as ITask

    const progressColumn = pageBoardStore.getProgressBoardStore().getColumnById(currentTask.columnId)?.title
    const user = rootStore.getUsersStore().getUserById(currentTask.userId) as IUser

    const getDropOptions = (dragTask: IExtendedTask,monitor: DropTargetMonitor<IExtendedTask>) => {
       /*  if(columnType === 'progress') { */
           /*  if(dragTask.columnId !== currentTask.columnId) {
                return 
            } */

            return {
                dragItem: dragTask,
                currentTask: { ...currentTask, index: taskIndex },
                hoverIndex: taskIndex,
                element: ref.current,
                clientOffsetY: monitor.getClientOffset()?.y as number,
                moveFunction/* : boardStore.moveTaskInsideProgressColumn.bind(boardStore, dragTask, { ...currentTask, index: taskIndex }) */
            } /* as IHoverAboveTaskInsideColumn */

       /*  }else if (columnType === 'user') {
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
        } */
    }

    const [ , drag] = useDrag({
        type: 'card',
        item: {...currentTask,index: taskIndex},
        collect: (monitor) => {
            const isDragging = monitor.isDragging()
            if (isDragging) {
                pageBoardStore.setDraggingTask(currentTask)
            }
            return monitor.isDragging()
        },
        end: () => {
            pageBoardStore.removeDraggingTask()
        }
    })

    const [, drop] = useDrop<IExtendedTask>({
        accept: 'card',
        collect: (monitor) => monitor.getHandlerId(),
        hover(item: IExtendedTask, monitor) {
            if (!ref.current) {
                return
            }

            if(item[propertyCheckDifference] !== currentTask[propertyCheckDifference]) {
                return 
            }

            pageBoardStore.setHoverTask({ ...currentTask, index: taskIndex })
            hoverAboveTaskInsideColumn(getDropOptions(item,monitor) as IHoverAboveTaskInsideColumn)


            /* const options = getDropOptions(item,monitor)
            
            if (options) {
                hoverAboveTaskInsideColumn(options)
            } */

        },
  })

    drag(drop(ref))

    return (
        <div className='task' ref={ref} style={{opacity: pageBoardStore.getDraggingTask().id == taskId ? 0 : 1}}>
            <div className='task__description'>{currentTask.description}</div>
            <div className='task__footer'>
                {taskRenderSettings.showColumnData && <div className='task__footer-column'>{progressColumn}</div>}
                {taskRenderSettings.showUserData && <div className='task__footer-user task__user'>
                    <div className='task__user-name'>{user.name}</div>
                    <div className='task__user-avatar'>
                        <img src={user.avatar ? user.avatar : anonimAvatar} alt="userAvatar" />
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default observer(Task)