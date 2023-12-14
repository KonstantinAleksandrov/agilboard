import { IUsersBoardStore, ITaskRenderSettings, IExtendedTask } from '../types';
import { makeAutoObservable } from 'mobx';
import { IUser, ITask } from '../models';
import { users } from '../data';

class UsersBoardStore implements IUsersBoardStore {
  private columns: IUser[];
  private taskRenderSettings: ITaskRenderSettings;
  constructor() {
    this.columns = users;
    this.taskRenderSettings = {
      showUserData: false,
      showColumnData: true,
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
    const column = this.getColumnById(task.userId);

    if (column) {
      column.tasks.push(task);
    }
  };

  setTaskOnGivenPlace = (task: ITask, hoverColumnId: number, index: number) => {
    const column = this.getColumnById(hoverColumnId);

    if (column) {
      task.userId = hoverColumnId;
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
    this.removeTask(dragTask.id, dragTask.userId);
    const hoverColumn = this.getColumnById(hoverTask.userId) as IUser;
    const currentTask: ITask = {
      id: dragTask.id,
      columnId: dragTask.columnId,
      userId: hoverTask.userId,
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

export default UsersBoardStore;
