import { IRootStore, ITasksStore, IUsersStore,IPageBoardStore } from "../types"
import { makeAutoObservable } from "mobx"

class RootStore implements IRootStore{
    private tasksStore: ITasksStore
    private usersStore: IUsersStore
    private pageBoardStore: IPageBoardStore
    constructor(tasksStore: ITasksStore, usersStore: IUsersStore,boardStore: IPageBoardStore ) {
        this.tasksStore = tasksStore
        this.usersStore = usersStore
        this.pageBoardStore = boardStore
        makeAutoObservable(this)
    }

    getPageBoardStore = (): IPageBoardStore => {
        return this.pageBoardStore
    }

    getTasksStore = (): ITasksStore => {
        return this.tasksStore
    }

    getUsersStore = (): IUsersStore => {
        return this.usersStore
    }
} 

export default RootStore