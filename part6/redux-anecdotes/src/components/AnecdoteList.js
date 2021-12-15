import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteIncrement } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote =({anecdote,handleClick})=>{
    return(
        <div>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={handleClick}>vote</button>
          </div>
        </div>
    )

}

const AnecdoteList = () => {
    const allAnecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    let anecdotes = []
    if (filter === null)
    {
        anecdotes = [...allAnecdotes]
      
    }
    else 
    {
        anecdotes = allAnecdotes.filter((anecdote) => anecdote.content.toLowerCase().match(filter.toLowerCase()))
    }
    
    
    const dispatch = useDispatch()
    const sortByVotes = (v1,v2) => v2.votes - v1.votes
    

    return(
        <div>
        {anecdotes.sort(sortByVotes).map(anecdote =>
            <Anecdote
                key={anecdote.id}
                anecdote={anecdote}
                handleClick={() => {
                    dispatch(voteIncrement(anecdote))
                    dispatch(setNotification(`you voted '${anecdote.content}'`, 10)) 
                  }
                  }
            />
        )}
        </div>
    )

}

export default AnecdoteList