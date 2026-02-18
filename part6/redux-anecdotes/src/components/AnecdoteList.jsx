import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes} <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === '') {
      return anecdotes
    }
    else {
      return anecdotes.filter(a => a.content.toLowerCase().includes(filter))
    }
  })
  const sorted = [...anecdotes].sort((a, b) => b.votes - a.votes)

  return (
    <div>
      {sorted.map(anecdote => (
        <Anecdote
        key={anecdote.id}
        anecdote={anecdote}
        handleClick={() => {
          dispatch(voteAnecdote(anecdote))
          dispatch(setNotification(`You voted '${anecdote.content}'`, 5))
        }}
        />
      ))}
    </div>
  )
}

export default AnecdoteList