import { ITask } from "../models"
import { IExtendedTask } from '../types'


interface IHoverAboveTask {
    dragItem: IExtendedTask,
    hoverIndex: number,
    element: HTMLDivElement,
    clientOffsetY: number, 
    moveFunction: () => void
}


export const hoverAboveTask = (options: IHoverAboveTask) => {
    const {dragItem, hoverIndex, element, clientOffsetY, moveFunction} = options
    const dragIndex = dragItem.index
    
    /* const dragIndex = item.index
    const hoverIndex = taskIndex */

    if (dragItem.index === hoverIndex) {
        return
    }

    const hoverBoundingRect = element.getBoundingClientRect()

    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

    /* const clientOffset = monitor.getClientOffset() */
  
    const hoverClientY =/*  clientOffset.y */ clientOffsetY - hoverBoundingRect.top

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
    }

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
    }

   /*  boardStore.moveTaskInsideColumn(item, { ...currentTask, index: hoverIndex }) */
   moveFunction()

   dragItem.index = hoverIndex
}