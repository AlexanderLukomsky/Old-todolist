import React, { MouseEvent } from 'react';
import { FilterType } from '../App';

type propsType = {
  title?: string
  tasks: Array<tasksPropsType>
  delTask: (id: number) => void
  setTask: (tasksStatus: FilterType) => void
}
export type tasksPropsType = {
  id: number
  title: string,
  isDone: boolean
}

export const Todolist = (props: propsType) => {
  const deleteTask = (id: number) => {
    props.delTask(id)
  }
  const newTask = props.tasks.map(el =>
    <li key={el.id}>
      <input type="checkbox" />
      <span>{el.title}</span>
      <button onClick={() => deleteTask(el.id)}>X-DELETE</button>
    </li>
  )

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {newTask}
        {/* <li><input type="checkbox" checked={props.tasks[0].isDone} /> <span>{props.tasks[0].title}</span></li>
        <li><input type="checkbox" checked={props.tasks[1].isDone} /> <span>{props.tasks[1].title}</span></li>
        <li><input type="checkbox" checked={props.tasks[2].isDone} /> <span>{props.tasks[2].title}</span></li> */}
      </ul>
      <div>
        <button onClick={() => props.setTask('All')}>All</button>
        <button onClick={() => props.setTask('Active')}>Active</button>
        <button onClick={() => props.setTask('Completed')}>Completed</button>
      </div>
    </div>
  )
}