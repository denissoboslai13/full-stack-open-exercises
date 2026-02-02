import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    vote(state, action) {
      const updated = action.payload
      return state.map(a => a.id !== updated.id ? a : updated
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    } 
  }
})

export const { createAnecdote, vote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (content) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.updateAnecdote(content)
    dispatch(vote(votedAnecdote))
  }
}

export default anecdoteSlice.reducer
