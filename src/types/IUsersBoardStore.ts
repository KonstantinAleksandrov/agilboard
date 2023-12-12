import { IBoardStore } from "./IBoardStore";
import { IUser } from "../models";

export interface IUsersBoardStore extends IBoardStore{
    getColumns: () => IUser[]
    getColumnById: (id: number) => IUser | undefined
}