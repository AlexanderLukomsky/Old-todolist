import './App.css';
import React, { useState } from 'react';
import { Todolist } from './Components/Todolist/Todolist';
import { v1 } from 'uuid';
export type tasksPropsType = {
    id: string
    title: string
    isDone: boolean
}
const tasks = [
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'React', isDone: false }
]
const deleteTask = (tasks: Array<tasksPropsType>, id: string) => {
    return tasks.filter(el => el.id !== id)
}
export type FilterType = 'All' | 'Active' | 'Completed'
function App() {
    const filterTask = (tasks: Array<tasksPropsType>, filter: FilterType) => {
        switch (filter) {
            case 'Active': return tasks.filter(el => el.isDone === false)
            case 'Completed': return tasks.filter(el => el.isDone === true)
            case 'All': return tasks.filter(el => el)
        }
    }
    const [taskStatus, setTask] = useState<FilterType>('All')
    const [newTasks, setNewTasks] = useState<Array<tasksPropsType>>(tasks)
    const filteredTasks = filterTask(newTasks, taskStatus)
    const addTask = (value: string) => {
        if (value) {
            setNewTasks([
                {
                    id: v1(), title: value, isDone: true
                },
                ...newTasks
            ])
        }

    }


    const delTask = (id: string) => {
        setNewTasks(deleteTask(newTasks, id))
    }

    return (
        <div className="App">
            <Todolist tasks={filteredTasks} setTask={setTask} delTask={delTask} addTask={addTask} />
        </div>
    );
}

export default App;
