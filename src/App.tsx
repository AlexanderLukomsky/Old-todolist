import { AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { AccountCircle, Menu } from '@material-ui/icons';
import { useState } from 'react';
import { v1 } from 'uuid';
import './App.scss';
import { AddNewItem } from './Components/AddNewItem/AddNewItem';
import { Todolist } from './Components/Todolist/Todolist';

type TasksTodolistType = {
    [key: string]: Array<TasksType>
}
type TasksType = {
    id: string
    title: string
    isDone: boolean
}
type TodoListsType = {
    title: string
    id: string
    filter: FilterType
}
type FilterType = 'All' | 'Active' | 'Completed'
function App() {
    const todoListID_1 = v1();
    const todoListID_2 = v1();
    const [todoLists, setTodoLists] = useState<Array<TodoListsType>>(
        [
            { title: 'what to learn', id: todoListID_1, filter: 'All' },
            { title: 'what to buy', id: todoListID_2, filter: 'All' }
        ]
    )
    const defaultTasks = {
        [todoListID_1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'React', isDone: false },
            { id: v1(), title: 'React', isDone: false },
            { id: v1(), title: 'React', isDone: false },
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true }
        ],
        [todoListID_2]: [
            { id: v1(), title: 'milk', isDone: true },
            { id: v1(), title: 'bread', isDone: true },
            { id: v1(), title: 'book', isDone: false },
        ]
    }

    const [tasks, setTasks] = useState<TasksTodolistType>(defaultTasks)
    const addNewTask = (title: string, taskID: string) => {
        setTasks({ ...tasks, [taskID]: [{ id: v1(), title, isDone: false }, ...tasks[taskID]] })
    }
    const deleteTask = (id: string, taskID: string) => {
        setTasks({ ...tasks, [taskID]: tasks[taskID].filter(t => t.id !== id) })
    }
    const changeIsDone = (id: string, check: boolean, taskID: string) => {
        setTasks({ ...tasks, [taskID]: [...tasks[taskID].map(t => t.id === id ? { ...t, isDone: check } : t)] })
    }
    const filterTodoLists = (filter: FilterType, todoListID: string) => {
        setTodoLists(todoLists.map(el => el.id === todoListID ? { ...el, filter: filter } : el))
    }

    const filterTask = (filterValue: FilterType, tasksID: string) => {
        switch (filterValue) {
            case 'Active': return tasks[tasksID].filter(el => !el.isDone)
            case 'Completed': return tasks[tasksID].filter(el => el.isDone)
            default: return tasks[tasksID]
        }
    }
    const addNewTodoList = (title: string) => {
        const todoListId = v1()
        setTodoLists([...todoLists, { title: title, id: todoListId, filter: 'All' }])
        setTasks({ ...tasks, [todoListId]: [] })
    }
    const deleteTodolist = (todoListID: string) => {
        setTodoLists([...todoLists.filter(el => el.id !== todoListID)])
        delete tasks[todoListID]
    }
    const editTaskValue = (title: string, taskID: string, todoListID: string) => {
        setTasks({ ...tasks, [todoListID]: tasks[todoListID].map(el => el.id === taskID ? { ...el, title: title } : el) })
    }

    return (
        <div>
            <AppBar position='static' >
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" >
                        Todolist
                    </Typography>
                    <IconButton
                        color='inherit'
                        style={{ marginLeft: 'auto' }}>
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Container maxWidth='md' style={{ padding: '20px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <AddNewItem title={'+'} callback={addNewTodoList} />
                </div>
                <Grid container spacing={5} style={{ padding: '20px 0' }}>
                    {todoLists.map(t => {
                        const filteredTask = filterTask(t.filter, t.id)
                        return <Grid item key={t.id}>
                            <Paper
                                variant='elevation'
                                elevation={10}
                                style={{ padding: '10px', height: '100%' }}>
                                <Todolist
                                    id={t.id}
                                    title={t.title}
                                    tasks={filteredTask}
                                    addNewTask={addNewTask}
                                    deleteTask={deleteTask}
                                    changeIsDone={changeIsDone}
                                    filterTodoLists={filterTodoLists}
                                    deleteTodolist={deleteTodolist}
                                    editTaskValue={editTaskValue}
                                    filter={t.filter}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>

        </div>
    )
}

export default App;
