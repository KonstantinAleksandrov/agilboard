import { IUsersBoardStore } from "../types"
import { makeAutoObservable } from "mobx"
import { IUser } from "../models"
import { users } from "../data"

class UsersBoardStore implements IUsersBoardStore{
    private columns: IUser[]
    constructor(){
        this.columns = users
        makeAutoObservable(this)
    }

    getColumns = () => {
        return this.columns
    }

    getColumnById = (id: number) => {
        return this.columns.find((column) => column.id === id)
    }
}

export default UsersBoardStore