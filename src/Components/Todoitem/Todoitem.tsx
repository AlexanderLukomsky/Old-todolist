import React, { ChangeEvent } from "react"
import { Button } from "../Button/Button"
import { Checkbox } from "../Checkbox/Checkbox"

type PropsType = {
  title: string
  isDone: boolean
  id: string
  deleteCurrentTask: (id: string) => void
  onCheckBoxHandler: (e: ChangeEvent<HTMLInputElement>, id: string) => void
}
export const Todoitem = ({ title, isDone, id, deleteCurrentTask, onCheckBoxHandler }: PropsType) => {
  return (
    <li className='item'>
      <label className='item__label'>
        <Checkbox onCheckBoxHandler={(e) => onCheckBoxHandler(e, id)} isDone={isDone} />
        <span className='item__checkbox-style'></span>
        {title}
      </label>
      <Button title={'X'} callback={() => { deleteCurrentTask(id) }} />
    </li>
  )
}