import { IconButton, Button } from "@material-ui/core"
import { Delete } from "@material-ui/icons"
import { ChangeEvent } from "react"
import { v1 } from "uuid"
import { AddNewItem } from "../AddNewItem/AddNewItem"
import { Todoitem } from "../Todoitem/Todoitem"
type TasksType = {
  id: string
  title: string
  isDone: boolean
}
type FilterType = 'All' | 'Active' | 'Completed'
type buttonNamesType = { name: FilterType, id: string }
type PropsType = {
  filter: FilterType
  id: string
  title: string
  tasks: Array<TasksType>
  addNewTask: (title: string, taskID: string) => void
  deleteTask: (id: string, taskID: string) => void
  changeIsDone: (id: string, check: boolean, taskID: string) => void
  filterTodoLists: (filterValue: FilterType, todoListID: string) => void
  deleteTodolist: (todoListID: string) => void
  editTaskValue: (value: string, taskID: string, todoListID: string) => void
}
export const Todolist = ({ tasks, addNewTask, deleteTask, changeIsDone, ...props }: PropsType) => {
  console.log(props)
  const addTask = (title: string) => { addNewTask(title, props.id) }
  const deleteCurrentTask = (id: string) => { deleteTask(id, props.id) }
  const onCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>, id: string) => { changeIsDone(id, e.currentTarget.checked, props.id) }
  const filterTodolist = (filter: FilterType, id: string) => {
    props.filterTodoLists(filter, id)
  }
  const editTaskTitle = (value: string, taskID: string) => {
    props.editTaskValue(value, taskID, props.id)
  }
  const arrayButtonNames: buttonNamesType[] = [{ name: 'All', id: v1() }, { name: 'Active', id: v1() }, { name: 'Completed', id: v1() }]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ fontSize: '24px' }}>{props.title}
        <IconButton
          aria-label="delete-todolist"
          color="default"
          onClick={() => { props.deleteTodolist(props.id) }}
        >
          <Delete />
        </IconButton>
      </div>
      <div>
        <AddNewItem title={'+'} callback={addTask} />
      </div>
      <ul style={{ display: 'flex', flexDirection: 'column', flex: '1 0 auto', fontSize: '18px', fontFamily: 'monospace' }}>
        {tasks.map(t =>
          <Todoitem key={t.id} title={t.title} isDone={t.isDone} id={t.id}
            deleteCurrentTask={deleteCurrentTask}
            onCheckBoxHandler={onCheckBoxHandler}
            editTaskTitle={editTaskTitle}
          />)}
      </ul>
      <div>
        {

          arrayButtonNames.map(b =>
            <Button
              key={b.id}
              size='medium'
              color={
                (props.filter === 'Completed') ?
                  'secondary' :
                  (props.filter === 'Active' || 'All') ?
                    'primary' :
                    'default'
              }
              variant={b.name === props.filter ? 'contained' : 'text'}
              onClick={() => { filterTodolist(`${b.name}`, props.id) }}
            >
              {b.name}
            </Button>
          )}
      </div>
    </div >
  )
}