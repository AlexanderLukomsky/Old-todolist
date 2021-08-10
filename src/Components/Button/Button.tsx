import React from "react"

type PropsType = {
  title: string
  callback: () => void
}
export const Button = ({ title, callback }: PropsType) => {
  return (
    <button onClick={callback}>{title}</button>
  )
}