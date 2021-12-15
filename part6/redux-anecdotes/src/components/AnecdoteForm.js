import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer' 
import { setNotification} from '../reducers/notificationReducer'


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async(event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        dispatch(createAnecdote(content))
        event.target.anecdote.value = ''
        dispatch(setNotification(`New Anecdote- '${content}' is created`, 10))
      }
      return (
        <form onSubmit={addAnecdote}>
          <input name="anecdote" />
          <button type="submit">create</button>
        </form>
      )
    }

export default AnecdoteForm