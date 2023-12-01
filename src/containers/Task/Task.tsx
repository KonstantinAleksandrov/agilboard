import './style.css'
import { FC, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { ITaskProps } from './TaskProps'
import { useBoardStore } from '../../hooks'
import { users } from '../../data'
import { IUser, ITask } from '../../models'
import anonimAvatar from '../../images/anonimAvatar.svg'
import { useDrag, useDrop } from 'react-dnd'

const Task: FC<ITaskProps> = ({taskId,columnName}) => {
    const boardStore = useBoardStore()
    const ref = useRef<HTMLDivElement>(null)
    const { id, columnId, userId, description } = boardStore.getTaskById(taskId) as ITask
    const currentUser = users.find((user)=> user.id === userId) as IUser
    // https://www.youtube.com/watch?v=9iuj4DBFT6I ссылка на видос по react-dnd

   /*  const [{ isDragging }, drag] = useDrag({
        type: 'card',
        item: () => {
          return { id, index }
        },
        collect: (monitor: any) => ({
          isDragging: monitor.isDragging(),
        }),
    }) */

    return (
        <div className='task'>
            <div className='task__description'>{description}</div>
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