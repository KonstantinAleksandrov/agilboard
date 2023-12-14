import { ITask } from './taskModel';

export interface IUser {
  id: number;
  name: string;
  avatar?: string;
  tasks: ITask[];
}
