import { ITask } from '../models';

export interface IColumn {
  id: number;
  title: string;
  tasks: ITask[];
}
