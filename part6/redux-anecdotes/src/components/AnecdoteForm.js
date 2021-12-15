import React from 'react'
import { connect } from 'react-redux' 
//import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer' 
import { setNotification} from '../reducers/notificationReducer'

const mapDispatchToProps = {
  createAnecdote,
  setNotification
}
const AnecdoteForm = (props) => {
    

    const addAnecdote = async(event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        props.createAnecdote(content)
        event.target.anecdote.value = ''
        props.setNotification(`New Anecdote- '${content}' is created`, 5)
      }
      return (
        <form onSubmit={addAnecdote}>
          <input name="anecdote" />
          <button type="submit">create</button>
        </form>
      )
    }
    const ConnectedAnecdoteForm = connect(null,mapDispatchToProps)( AnecdoteForm)

    export default ConnectedAnecdoteForm
