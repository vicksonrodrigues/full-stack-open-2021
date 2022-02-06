import React from 'react'

const Anecdote =({anecdote,vote})=>{
  const handleVote=()=>
  {
    vote(anecdote.id)

  }
    return (
      <div>
        <h2>{anecdote.content} by {anecdote.author}</h2>
        <div>has {anecdote.votes} votes
        <button onClick={handleVote}>vote</button>
        </div>
        <div>for more info see <a href={anecdote.info}>{anecdote.info}</a></div>
      </div>
    )
  }

export default Anecdote