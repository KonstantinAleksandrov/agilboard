import { IProgressBoardStore, IColumn, IExtendedTask, ITaskRenderSettings } from '../types';
import { columns } from '../data';
import { ITask } from '../models';
import { makeAutoObservable } from 'mobx';

class ProgressBoardStore implements IProgressBoardStore {
  private columns: IColumn[];
  private taskRenderSettings: ITaskRenderSettings;
  constructor() {
    this.columns = columns;
    this.taskRenderSettings = {
      showUserData: true,
      showColumnData: false,
    };
    makeAutoObservable(this);
  }

  getColumns = () => {
    return this.columns;
  };

  getColumnById = (id: number) => {
    return this.columns.find((column) => column.id === id);
  };

  setTask = (task: ITask) => {
    const column = this.getColumnById(task.columnId);

    if (column) {
      column.tasks.push(task);
    }
  };

  setTaskOnGivenPlace = (task: ITask, hoverColumnId: number, index: number) => {
    const column = this.getColumnById(hoverColumnId);

    if (column) {
      task.columnId = hoverColumnId;
      column.tasks.splice(index, 0, task);
    }
  };

  removeTask = (taskId: number, columnId: number) => {
    const currentColumn = this.getColumnById(columnId);
    if (currentColumn) {
      currentColumn.tasks = currentColumn.tasks.filter((task) => task.id !== taskId);
    }
  };

  moveTaskInsideColumn = (dragTask: IExtendedTask, hoverTask: IExtendedTask) => {
    this.removeTask(dragTask.id, dragTask.columnId);
    const hoverColumn = this.getColumnById(hoverTask.columnId) as IColumn;
    const currentTask: ITask = {
      id: dragTask.id,
      columnId: hoverTask.columnId,
      userId: dragTask.userId,
      description: dragTask.description,
    };
    hoverColumn.tasks.splice(hoverTask.index, 0, currentTask);
  };

  getTaskRenderSettings = () => {
    return this.taskRenderSettings;
  };

  init = (tasks: ITask[]) => {
    this.columns.forEach((column) => (column.tasks = []));

    tasks.forEach((task) => {
      this.setTask(task);
    });
  };
}

export default ProgressBoardStore;
