import { makeAutoObservable } from "mobx";
import { IBoardStore, boardTypes, IColumn, IExtendedTask } from "../types";
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

    getProgressColumnById = (id: number): IColumn | undefined => {
        return this.progresColumns.find((column) => column.id === id)
    }

    setTaskInColumn = (task: ITask) => {
        const column = this.getProgressColumnById(task.columnId)
        
        if (column) {
            column.tasks.push(task)
        }
    }

    init = () => {
        this.tasks.forEach((task)=> {
            this.setTaskInColumn(task)
        })
    }

    removeTask = (taskId: number, columnId: number) => {
        const currentColumn = this.getProgressColumnById(columnId) /* as IColumn */
        if(currentColumn) {
            console.log(255)
            currentColumn.tasks = currentColumn.tasks.filter((task) => task.id !== taskId)
        }
    }

    moveTaskInsideColumn = (dragTask: IExtendedTask, hoverTask: IExtendedTask) => {
        this.removeTask(dragTask.id,dragTask.columnId)
        const hoverColumn = this.getProgressColumnById(hoverTask.columnId) as IColumn
        const currentTask: ITask = {
            id: dragTask.id,
            columnId: hoverTask.columnId,
            userId: dragTask.userId,
            description: dragTask.description
        }
        hoverColumn.tasks.splice(hoverTask.index,0,currentTask)
        console.log(`${25}` ,this.progresColumns)
    }

}


export default BoardStore