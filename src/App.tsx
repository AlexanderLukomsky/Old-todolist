import React from 'react';
import './App.css';
import { Todolist } from './Components/Todolist';

function App() {

    const tasks = [
        { id: 1, title: 'HTML&CSS', isDone: true },
        { id: 2, title: 'JS', isDone: true },
        { id: 3, title: 'React', isDone: false }
    ]
    const tasks2 = [
        { id: 1, title: 'HTML&CSS222222222', isDone: true },
        { id: 2, title: 'JS2222222222', isDone: true },
        { id: 3, title: 'React222222222', isDone: false }
    ]
    return (
        <div className="App">
            <Todolist tasks={tasks} />
            <Todolist title='What to learn 222' tasks={tasks2} />
        </div>
    );
}

export default App;
