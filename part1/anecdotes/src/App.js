
import React, { useState } from 'react'

const Anecdote=(props)=>{
  return(
    <div>
      <h1>{props.text}</h1>
      <div>{props.anecdotes[props.selected]}</div>
      <br/>
      <div><b>Votes</b>:{props.vote[props.selected]}</div>
      <br/>
    </div>
  )
}

const Button = (props)=> {
  return(
      <button onClick={props.random}>{props.text}</button>
  )
}

const Popular =(props)=>
{
  if(props.popular===0)
  {
    return(
      <div>
        
        No Popular Anecdotes
      </div>
    )
  }
  return(
    <div>
      {props.anecdotes[props.popular]}
    </div>
  ) 
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  
  const [vote,setVote]=useState(new Array(anecdotes.length).fill(0))
  const [selected, setSelected] = useState(Math.floor(Math.random() * anecdotes.length))
  
  const popular = vote.indexOf(Math.max(...vote))

  const handleRandomAnecdote =()=>{
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleVote =()=>{   
      const copy = [...vote]
      copy[selected] += 1 
      setVote(copy) 
  }

  return (
    <div> 
      <Anecdote selected={selected} anecdotes={anecdotes} vote={vote} text='Anecdotes of the Day'/>
      <Button random ={handleVote} text='Vote'/>
      &nbsp;
      <Button random={handleRandomAnecdote} text='Next Anecdotes'/>
      <h1>Anecdotes with most votes</h1>
      <Popular popular={popular} anecdotes={anecdotes}/>
    </div>
  )
}

export default App;
