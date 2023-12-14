import { IHoverAboveTaskInsideColumn } from '../types';

// логика смены мест мужду задачами
export const hoverAboveTaskInsideColumn = (options: IHoverAboveTaskInsideColumn) => {
  const { dragItem, hoverIndex, element, clientOffsetY, moveFunction, currentTask } = options;
  const dragIndex = dragItem.index;

  if (dragItem.index === hoverIndex) {
    return;
  }

  const hoverBoundingRect = element.getBoundingClientRect();

  const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

  const hoverClientY = clientOffsetY - hoverBoundingRect.top;

  if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
    return;
  }

  if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
    return;
  }

  moveFunction(dragItem, currentTask);

  dragItem.index = hoverIndex;
};
