import { makeAutoObservable } from "mobx";
import { IBoardStore, boardTypes, IColumn, IExtendedTask } from "../types";
import { ITask, IUser  } from '../models'

class BoardStore implements IBoardStore{
    private boardTypes: boardTypes[]
    private progresColumns: IColumn[]
    private usersColumns: IUser[]
    private tasks: ITask[]
    private draggingTask: ITask
    private hoverTask: IExtendedTask

    constructor(progresColumns: IColumn[],tasks: ITask[], usersColumns: IUser[]){
        this.boardTypes = ['type','users']
        this.progresColumns = progresColumns
        this.tasks = tasks
        this.usersColumns = usersColumns
        this.draggingTask = {} as ITask
        this.hoverTask = {} as IExtendedTask
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

    getUsersColumns = () => {
        return this.usersColumns
    }

    getUserColumnById = (id: number): IUser | undefined => {
        return this.usersColumns.find((column) => column.id === id)
    }

    setTaskInProgressColumn = (task: ITask) => {
        const column = this.getProgressColumnById(task.columnId)
        
        if (column) {
            column.tasks.push(task)
        }
    }

    setTaskInUserColumn = (task: ITask) => {
        const column = this.getUserColumnById(task.userId)
        if (column) {
            column.tasks.push(task)
        }
    }
    
    setTaskInProgressColumnOnGivenPlace = (dragTaskId: number, hoverColumnId: number,index: number) => {
        const column = this.getProgressColumnById(hoverColumnId)
        const currentTask = this.getTaskById(dragTaskId)
        if (column && currentTask) {
            currentTask.columnId = hoverColumnId
            column.tasks.splice(index,0,currentTask)
        }
    }

    setTaskInUserColumnOnGivenPlace = (dragTaskId: number, hoverColumnId: number, index: number) => {
        const column = this.getUserColumnById(hoverColumnId)
        const currentTask = this.getTaskById(dragTaskId)
        if (column && currentTask) {
            currentTask.userId = hoverColumnId
            column.tasks.splice(index,0,currentTask)
        }
    }

    removeTaskFromProgressColumn = (taskId: number, columnId: number) => {
        const currentColumn = this.getProgressColumnById(columnId) 
        if(currentColumn) {
            currentColumn.tasks = currentColumn.tasks.filter((task) => task.id !== taskId)
        }
    }

    removeTaskFromUserColumn = (taskId: number,columnId: number) => {
        const currentColumn = this.getUserColumnById(columnId)
        if(currentColumn) {
            currentColumn.tasks = currentColumn.tasks.filter((task) => task.id !== taskId)
        }
    }

    moveTaskInsideProgressColumn = (dragTask: IExtendedTask, hoverTask: IExtendedTask) => {
        this.removeTaskFromProgressColumn(dragTask.id,dragTask.columnId)
        const hoverColumn = this.getProgressColumnById(hoverTask.columnId) as IColumn
        const currentTask: ITask = {
            id: dragTask.id,
            columnId: hoverTask.columnId,
            userId: dragTask.userId,
            description: dragTask.description
        }
        hoverColumn.tasks.splice(hoverTask.index,0,currentTask)
    }

    moveTaskInsideUserColumn = (dragTask: IExtendedTask, hoverTask: IExtendedTask) => {
        this.removeTaskFromUserColumn(dragTask.id,dragTask.userId)
        const hoverColumn = this.getUserColumnById(hoverTask.userId) as IUser
        const currentTask: ITask = {
            id: dragTask.id,
            columnId: dragTask.columnId,
            userId: hoverTask.userId,
            description: dragTask.description
        }
        hoverColumn.tasks.splice(hoverTask.index,0,currentTask)
    }

    setDraggingTask = (task: ITask) => {
        this.draggingTask = task
    }

    removeDraggingTask = () => {
        this.draggingTask = {} as ITask
    }

    getDraggingTask = () => {
        return this.draggingTask
    }

    setHoverTask = (task: IExtendedTask) => {
        this.hoverTask = task
    }

    removeHoverTask = () => {
        this.hoverTask = {} as IExtendedTask
    }

    getHoverTask = () => {
        return this.hoverTask
    }

    init = () => {
        this.progresColumns.forEach((column)=> {
            column.tasks = []
        })
        this.usersColumns.forEach((column)=>{
            column.tasks = []
        })
        this.tasks.forEach((task)=> {
            this.setTaskInProgressColumn(task)
            this.setTaskInUserColumn(task)
        })
    }

}


export default BoardStore