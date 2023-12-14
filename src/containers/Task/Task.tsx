import './style.css';
import { FC, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { ITaskProps } from './TaskProps';
import { useRootStore } from '../../hooks';
import { ITask, IUser } from '../../models';
import anonimAvatar from '../../images/anonimAvatar.svg';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { hoverAboveTaskInsideColumn } from '../../utils';
import { IExtendedTask, IHoverAboveTaskInsideColumn } from '../../types';

const Task: FC<ITaskProps> = (props) => {
  const { taskId, taskIndex, moveFunction, propertyCheckDifference, taskRenderSettings } = props;

  const ref = useRef<HTMLDivElement>(null); // для хранения перетаскиваемого DOM елемента
  const rootStore = useRootStore(); // корневой стор
  const tasksStore = rootStore.getTasksStore(); // стор задач
  const pageBoardStore = rootStore.getPageBoardStore(); // стор страницы с досками
  const currentTask = tasksStore.getTaskById(taskId) as ITask; // данные текущей задачи

  const progressColumn = pageBoardStore.getProgressBoardStore().getColumnById(currentTask.columnId)?.title; // название колонки прогресса в котой находится текущая задача
  const user = rootStore.getUsersStore().getUserById(currentTask.userId) as IUser; // пользователь которому принадлежит текущая задача

  // получаем настройки для обработки события drop
  const getDropOptions = (dragTask: IExtendedTask, monitor: DropTargetMonitor<IExtendedTask>) => {
    return {
      dragItem: dragTask, // зачада которую тащим
      currentTask: { ...currentTask, index: taskIndex }, // зачада над которой вызывается эта функция
      hoverIndex: taskIndex, // индекс задачи  над которой вызывается эта функция
      element: ref.current, // Dom елемент над которым вызывается эта функция
      clientOffsetY: monitor.getClientOffset()?.y as number, // возвращает текущие координаты мыши относительно окна браузера
      moveFunction, // функция которя будет менять местами задачи внутри колонки
    };
  };

  // функция работает когда мы начинаем тащить задачу
  const [, drag] = useDrag({
    type: 'card',
    item: { ...currentTask, index: taskIndex },
    collect: (monitor) => {
      const isDragging = monitor.isDragging();
      if (isDragging) {
        pageBoardStore.setDraggingTask(currentTask);
      }
      return monitor.isDragging();
    },
    end: () => {
      pageBoardStore.removeDraggingTask();
    },
  });

  // функция отрабатывает когда мы бросаем задачу на другую задачу
  const [, drop] = useDrop<IExtendedTask>({
    accept: 'card',
    collect: (monitor) => monitor.getHandlerId(),
    hover(item: IExtendedTask, monitor) {
      if (!ref.current) {
        return;
      }

      // проверка на то что перетаскиваем внутри колонки а не между
      if (item[propertyCheckDifference] !== currentTask[propertyCheckDifference]) {
        return;
      }

      pageBoardStore.setHoverTask({ ...currentTask, index: taskIndex });
      hoverAboveTaskInsideColumn(getDropOptions(item, monitor) as IHoverAboveTaskInsideColumn);
    },
  });

  drag(drop(ref));

  return (
    <div className='task' ref={ref} style={{ opacity: pageBoardStore.getDraggingTask().id == taskId ? 0 : 1 }}>
      <div className='task__description'>{currentTask.description}</div>
      <div className='task__footer'>
        {taskRenderSettings.showColumnData && <div className='task__footer-column'>{progressColumn}</div>}
        {taskRenderSettings.showUserData && (
          <div className='task__footer-user task__user'>
            <div className='task__user-name'>{user.name}</div>
            <div className='task__user-avatar'>
              <img src={user.avatar ? user.avatar : anonimAvatar} alt='userAvatar' />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default observer(Task);
