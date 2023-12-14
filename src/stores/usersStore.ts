import { IUsersStore } from '../types';
import { users } from '../data';
import { IUser } from '../models';
import { makeAutoObservable } from 'mobx';

class UsersStore implements IUsersStore {
  private users: IUser[];
  constructor() {
    this.users = users;
    makeAutoObservable(this);
  }

  getUsers = () => {
    return this.users;
  };

  getUserById = (id: number): IUser | undefined => {
    return this.users.find((user) => user.id === id);
  };
}

export default UsersStore;
