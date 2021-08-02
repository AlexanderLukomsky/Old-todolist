import React, { useState } from 'react';
import './App.css';
import { tasksPropsType, Todolist } from './Components/Todolist';
const tasks = [
    { id: 1, title: 'HTML&CSS', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'React', isDone: false }
]
const deleteTask = (tasks: Array<tasksPropsType>, id: number) => {
    return tasks.filter(el => el.id !== id)
}
export type FilterType = 'All' | 'Active' | 'Completed'
function App() {
    const filterTask = (tasks: Array<tasksPropsType>, filter: FilterType) => {
        if (filter === 'Active') {
            return tasks.filter(el => el.isDone === false)
        }
        if (filter === 'Completed') {
            return tasks.filter(el => el.isDone === true)
        }
        if (filter === 'All') {
            return tasks.filter(el => el)
        }
        return tasks
    }
    const [taskStatus, setTask] = useState<FilterType>('All')
    const [newTasks, setNewTasks] = useState<Array<tasksPropsType>>(tasks)
    const filteredTasks = filterTask(newTasks, taskStatus)



    const delTask = (id: number) => {
        setNewTasks(deleteTask(newTasks, id))
    }

    return (
        <div className="App">
            <Todolist tasks={filteredTasks} setTask={setTask} delTask={delTask} />
        </div>
    );
}

export default App;
