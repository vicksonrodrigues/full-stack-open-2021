import React, { useEffect } from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'

import { useDispatch } from 'react-redux'
import { initializeAnecdoteList } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  
  useEffect(()=> {
    dispatch(initializeAnecdoteList())
  },[dispatch])

  return (
    <div>
      <Notification/>
      <h2>Anecdotes</h2>
      <Filter/>
      <AnecdoteList/>
      <h2>Create new</h2>
      <AnecdoteForm/>
    </div>
  )
}

export default App