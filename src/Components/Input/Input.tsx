import React, { ChangeEvent } from "react"

type PropsType = {
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void
  taskValue: string
}
export const Input = ({ onChangeHandler, taskValue }: PropsType) => {
  return (
    <input
      type='text'
      value={taskValue}
      onChange={onChangeHandler}
    />
  )
}