import React, { ChangeEvent, useState } from "react"
import { Button } from "../Button/Button"
import { Input } from "../Input/Input"
import { Todoitem } from "../Todoitem/Todoitem"
type TasksType = {
  id: string
  title: string
  isDone: boolean
}
type FilterType = 'All' | 'Active' | 'Completed'
type PropsType = {
  tasks: Array<TasksType>
  addNewTask: (title: string) => void
  deleteTask: (id: string) => void
  changeIsDone: (id: string, check: boolean) => void
  setFilter: (filterValue: FilterType) => void
}
export const Todolist = ({ tasks, addNewTask, deleteTask, changeIsDone, setFilter }: PropsType) => {
  const [taskValue, setTaskValue] = useState('')
  const addTask = () => { addNewTask(taskValue) }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => { setTaskValue(e.currentTarget.value) }
  const deleteCurrentTask = (id: string) => { deleteTask(id) }
  const onCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>, id: string) => { changeIsDone(id, e.currentTarget.checked) }
  return (
    <div>
      <Input taskValue={taskValue} onChangeHandler={onChangeHandler} />
      <Button title={'+'} callback={() => { addTask() }} />
      <ul>
        {tasks.map(t =>
          <Todoitem key={t.id} title={t.title} isDone={t.isDone} id={t.id} deleteCurrentTask={deleteCurrentTask}
            onCheckBoxHandler={onCheckBoxHandler} />)}
      </ul>
      <Button title={'All'} callback={() => { setFilter('All') }} />
      <Button title={'Active'} callback={() => { setFilter('Active') }} />
      <Button title={'Completed'} callback={() => { setFilter('Completed') }} />
    </div>
  )
}