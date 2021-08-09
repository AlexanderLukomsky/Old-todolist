
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
type FilterType = 'All' | 'Active' | 'Completed'
type tasksPropsType = {
  id: string
  title: string,
  isDone: boolean
}
type propsType = {
  title?: string
  tasks: Array<tasksPropsType>
  delTask: (id: string) => void
  setTask: (tasksStatus: FilterType) => void
  addTask: (value: string) => void
}
export const Todolist = (props: propsType) => {
  const deleteTask = (id: string) => {
    props.delTask(id)
  }
  const filterTask = (filterValue: FilterType) => {
    props.setTask(filterValue)
  }

  const [inputValue, setInputValue] = useState<string>('')
  const addNewTast = (value: string) => {
    props.addTask(value)
  }
  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }
  const keyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      props.addTask(inputValue)
    }
  }

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <Input value={inputValue} callback={changeValue} callback2={keyHandler} />
        <Button title={'+'} callback={() => addNewTast(inputValue)} />
      </div>
      <ul>
        {
          props.tasks.map(el =>
            <li key={el.id}>
              <input type="checkbox" />
              <span>{el.title}</span>
              <Button title={'X'} callback={() => deleteTask(el.id)} />
            </li>
          )}
      </ul>
      <div>
        <Button title={'All'} callback={() => filterTask('All')} />
        <Button title={'Active'} callback={() => filterTask('Active')} />
        <Button title={'Completed'} callback={() => filterTask('Completed')} />
      </div>
    </div>
  )
}