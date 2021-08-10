import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.scss';
import { Todolist } from './Components/Todolist/Todolist';

const defaultTasks = [
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'React', isDone: false },
    { id: v1(), title: 'React', isDone: false },
    { id: v1(), title: 'React', isDone: false },
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true }
]
type TasksType = {
    id: string
    title: string
    isDone: boolean
}
type FilterType = 'All' | 'Active' | 'Completed'
function App() {
    const [tasks, setTasks] = useState<Array<TasksType>>(defaultTasks)
    const [filter, setFilter] = useState<FilterType>('All')
    const addNewTask = (title: string) => {
        setTasks([{ id: v1(), title: title, isDone: false }, ...tasks])
    }
    const deleteTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id))

    }
    const changeIsDone = (id: string, check: boolean) => {
        setTasks(tasks.map(el => el.id === id ? { ...el, isDone: check } : el))
    }

    const filterTask = (filterValue: FilterType, tasks: Array<TasksType>) => {
        switch (filterValue) {
            case 'Active': return tasks.filter(el => !el.isDone)
            case 'Completed': return tasks.filter(el => el.isDone)
            default: return tasks.filter(el => el)
        }
    }
    const filteredTask = filterTask(filter, tasks)
    return (
        <div>
            <Todolist tasks={filteredTask} addNewTask={addNewTask} deleteTask={deleteTask} changeIsDone={changeIsDone} setFilter={setFilter} />
        </div>
    )
}

export default App;
