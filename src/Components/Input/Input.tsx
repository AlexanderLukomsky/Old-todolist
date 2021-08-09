import { ChangeEvent, KeyboardEvent } from "react"

type PropsType = {
  value: string
  callback: (e: ChangeEvent<HTMLInputElement>) => void
  callback2?: (e: KeyboardEvent<HTMLInputElement>) => void
}
export const Input = ({ value, callback, callback2 }: PropsType) => {


  return (
    <input value={value} onChange={callback} onKeyPress={callback2} />
  )
}