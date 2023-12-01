import { makeAutoObservable } from "mobx";
import { IBoardStore, boardTypes, IColumn} from "../types";
import { ITask  } from '../models'

class BoardStore implements IBoardStore{
    private boardTypes: boardTypes[]
    private progresColumns: IColumn[]
    private tasks: ITask[]

    constructor(columnsData: IColumn[],tasks: ITask[]){
        this.boardTypes = ['type','users']
        this.progresColumns = columnsData
        this.tasks = tasks
        makeAutoObservable(this)
    }

    getBoardTypes = () :boardTypes[] => {
        return this.boardTypes
    }

    getProgressColumns = ():IColumn[] => {
        return this.progresColumns
    }

    getTasks = ():ITask[] => {
        return this.tasks
    }

    getTaskById = (id: number):ITask | undefined=> {
        return this.tasks.find((task)=> task.id === id)
    }

    getProgressColumnById = (id: number):IColumn | undefined => {
        return this.progresColumns.find((column) => column.id === id)
    }

    incrementTaskCounter = (columnId: number) => {
        const currentColumn = this.getProgressColumnById(columnId)
        if (currentColumn) {
            currentColumn.taskCounter++
        }
    }

    decrementTaskCounter = (columnId: number) => {
        const currentColumn = this.getProgressColumnById(columnId)
        if (currentColumn) {
            currentColumn.taskCounter--
        }
    }

    setTaskCounter = () => {
        this.progresColumns.forEach((column)=>{
            const tasks = this.getTasks().filter((task)=>task.columnId === column.id)
            column.taskCounter = tasks.length
        })
    }
}


export default BoardStore