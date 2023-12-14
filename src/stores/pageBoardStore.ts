import { IPageBoardStore, boardTypes, IProgressBoardStore, IUsersBoardStore, IExtendedTask } from '../types';
import { ITask } from '../models';
import { makeAutoObservable } from 'mobx';

class PageBoardStore implements IPageBoardStore {
  private boardTypes: boardTypes[];
  private activeBoard: boardTypes;
  private progressBoardStore: IProgressBoardStore;
  private usersBoardStore: IUsersBoardStore;
  private draggingTask: ITask;
  private hoverTask: IExtendedTask;
  constructor(progressBoardStore: IProgressBoardStore, usersBoardStore: IUsersBoardStore) {
    this.boardTypes = ['type', 'users'];
    this.activeBoard = 'type';
    this.draggingTask = {} as ITask;
    this.hoverTask = {} as IExtendedTask;
    this.progressBoardStore = progressBoardStore;
    this.usersBoardStore = usersBoardStore;
    makeAutoObservable(this);
  }

  getBoardTypes = (): boardTypes[] => {
    return this.boardTypes;
  };

  getActiveBoard = (): boardTypes => {
    return this.activeBoard;
  };

  setActiveBoard = (type: boardTypes) => {
    this.activeBoard = type;
  };

  getUsersBoardStore = (): IUsersBoardStore => {
    return this.usersBoardStore;
  };

  getProgressBoardStore = (): IProgressBoardStore => {
    return this.progressBoardStore;
  };

  setDraggingTask = (task: ITask) => {
    this.draggingTask = task;
  };

  removeDraggingTask = () => {
    this.draggingTask = {} as ITask;
  };

  getDraggingTask = () => {
    return this.draggingTask;
  };

  setHoverTask = (task: IExtendedTask) => {
    this.hoverTask = task;
  };

  removeHoverTask = () => {
    this.hoverTask = {} as IExtendedTask;
  };

  getHoverTask = () => {
    return this.hoverTask;
  };
}

export default PageBoardStore;
