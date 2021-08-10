import React, { ChangeEvent } from "react"

type PropsType = {
  isDone: boolean
  onCheckBoxHandler: (e: ChangeEvent<HTMLInputElement>) => void
}
export const Checkbox = ({ isDone, onCheckBoxHandler }: PropsType) => {
  return (
    <input className='item__checkbox' type='checkbox' onChange={onCheckBoxHandler} checked={isDone} />
  )
}