import './style.css'
import { FC, PropsWithChildren } from 'react'
import { IColumnProps } from './ColumnProps'
import { observer } from 'mobx-react-lite'
import { Task } from '../Task'
import { useDrop } from 'react-dnd'
import { IExtendedTask } from '../../types'

const Column: FC<PropsWithChildren<IColumnProps>> = (props) => {
    const {
        children,
        hoverHandler,
        tasks,
        columnId,
        moveFunction,
        propertyCheckDifference,
        taskRenderSettings
    } = props

    // функция hoverHandler срабатывает когда задача находится над колонкой
    const [ , dropRef] = useDrop<IExtendedTask>({
        accept: 'card',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }              
        },
        hover(item) {
            hoverHandler(item,columnId)
        },
    })

    return (
        <div className='column'>
            <div className='column__header'>{children}</div>
            <div className='column__body'>
                <div className='column__body-taskList column__taskList' ref={dropRef}>
                   {tasks.map((task,index)=>{
                        return (
                            <Task 
                                taskId={task.id} 
                                key={task.id} 
                                taskIndex={index}
                                moveFunction={moveFunction}
                                propertyCheckDifference={propertyCheckDifference}
                                taskRenderSettings={taskRenderSettings}
                            />
                        )
                   })}
                </div>
            </div>
        </div>
    )
}

export default observer(Column)