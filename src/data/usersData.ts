import womanAvatar from '../images/womanAvatar.png';
import manAvatar from '../images/manAvatar.jpg';
import { IUser } from '../models';

export const users: IUser[] = [
  {
    id: 1,
    name: 'Petya',
    avatar: manAvatar,
    tasks: [],
  },
  {
    id: 2,
    name: 'Irina',
    avatar: womanAvatar,
    tasks: [],
  },
  {
    id: 3,
    name: 'Sergey',
    avatar: '',
    tasks: [],
  },
];
