import { IUser } from '../models';

export interface IUsersStore {
  getUserById: (id: number) => IUser | undefined;
  getUsers: () => IUser[];
}
