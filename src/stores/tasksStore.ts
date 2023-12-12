import { ITasksStore } from "../types"
import { tasks } from "../data"
import { ITask } from "../models"
import { makeAutoObservable } from 'mobx'

class TasksStore implements ITasksStore{
    private tasks: ITask[]
    constructor(){
        this.tasks = tasks
        makeAutoObservable(this)
    }

    getTasks = ():ITask[] => {
        return this.tasks
    }

    getTaskById = (id: number):ITask | undefined=> {
        return this.tasks.find((task)=> task.id === id)
    }
}

export default TasksStore