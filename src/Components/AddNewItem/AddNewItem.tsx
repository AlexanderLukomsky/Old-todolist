import { IconButton, TextField } from "@material-ui/core"
import { ChangeEvent, KeyboardEvent, useState } from "react"
import AddIcon from '@material-ui/icons/Add';
type PropsType = {
  title: string
  callback: (title: string) => void
}
export const AddNewItem = ({ callback, ...props }: PropsType) => {
  const userMessage = <div style={{ color: 'red' }}> Title is required </div>
  const [title, setTitle] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const onClickHandler = () => {
    const newTitle = title.trim();
    if (!newTitle) {
      setTitle('')
      setError(true)
      return
    }
    callback(title)
    setTitle('')
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(false)
    if (e.key === 'Enter') {
      onClickHandler()
      setTitle('')
    }
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        variant='outlined'
        label='Enter your text'
        size='small'
        style={{ marginRight: '10px' }}
        type="text" value={title}
        onFocus={() => { setError(false) }}
        onKeyPress={onKeyPressHandler}
        onChange={onChangeHandler}
        error={!!error}
        helperText={error && userMessage}
      />
      <IconButton
        color='primary'
        onClick={onClickHandler}
      >
        <AddIcon />
      </IconButton>
    </div>
  )
}