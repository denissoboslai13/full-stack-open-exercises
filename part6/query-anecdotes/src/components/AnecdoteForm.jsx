import { useContext } from "react"
import NotifContext from "../NotificationContext"

const AnecdoteForm = ({ handleCreate }) => {
  const { notifDispatch } = useContext(NotifContext)

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    handleCreate(content)
    notifDispatch({ type: 'CREATE' , payload: content})
    setTimeout(() => {
      notifDispatch({ type: 'CLEAR' })
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
