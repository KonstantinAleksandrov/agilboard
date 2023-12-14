import { ITask } from '../models';
import { IExtendedTask } from './dndTypes';
import { ITaskRenderSettings } from '.';

export interface IBoardStore {
  setTask: (task: ITask) => void;
  init: (tasks: ITask[]) => void;
  removeTask: (taskId: number, columnId: number) => void;
  setTaskOnGivenPlace: (task: ITask, hoverColumnId: number, index: number) => void;
  moveTaskInsideColumn: (dragTask: IExtendedTask, hoverTask: IExtendedTask) => void;
  getTaskRenderSettings: () => ITaskRenderSettings;
}
