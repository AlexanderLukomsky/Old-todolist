
import { ChangeEvent, useState } from "react"
import { Checkbox, IconButton, TextField } from "@material-ui/core"
import { Delete } from "@material-ui/icons"


type PropsType = {
  title: string
  isDone: boolean
  id: string
  deleteCurrentTask: (id: string) => void
  onCheckBoxHandler: (e: ChangeEvent<HTMLInputElement>, id: string) => void
  editTaskTitle: (value: string, taskID: string) => void
}
export const Todoitem = ({ title, isDone, id, deleteCurrentTask, onCheckBoxHandler, ...props }: PropsType) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [titleValue, setTitle] = useState<string>('')
  const onDoubleClickHandler = () => {
    setTitle(title)
    setEditMode(true)
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const onBlurHandler = () => {
    props.editTaskTitle(titleValue, id)
    setEditMode(false)
  }
  return (
    <li style={{ opacity: isDone ? '0.6' : '1' }} onDoubleClick={onDoubleClickHandler}>
      {editMode ?
        <TextField autoFocus
          value={titleValue}
          onChange={onChangeHandler}
          onBlur={onBlurHandler} />
        :
        <div>
          <Checkbox
            color='primary'
            onChange={(e) => onCheckBoxHandler(e, id)}
            checked={isDone}
          />
          <span> {title}</span>
          <IconButton
            aria-label="delete-task"
            color="default"
            onClick={() => { deleteCurrentTask(id) }}
          >
            <Delete />
          </IconButton>
        </div>
      }
    </li>
  )
}
