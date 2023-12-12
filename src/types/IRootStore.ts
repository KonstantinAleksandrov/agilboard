import { IPageBoardStore } from "./IPageBoardStore"
import { ITasksStore } from "./ITasksStore"
import { IUsersStore } from "./IUsersStore"

export interface IRootStore {
    getPageBoardStore: () => IPageBoardStore
    getTasksStore: () => ITasksStore
    getUsersStore: () => IUsersStore 
}