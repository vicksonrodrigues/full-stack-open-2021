import React,{useState} from "react";

const Statistics =(props)=>{
  console.log(props)
  const all =(props.good+props.bad+props.neutral)
  const average =(((props.good*1)+(props.bad*(-1))+(props.neutral*0))/all)
  const positive =((props.good/all)*100)
  if (all === 0) {
    return(
      <div>No Feedback Given 
        <b> NOTE: Continue from unicafe step 6 </b>
        </div>
    )
  }
  return(
    <div>
      <table>
        <tbody>
      <StatisticLine text="good" value ={props.good} />
      <StatisticLine text="neutral" value ={props.neutral} />
      <StatisticLine text="bad" value ={props.bad} />
      <StatisticLine text="all" value ={all} />
      <StatisticLine text="average" value ={average} />
      <StatisticLine text="positive" value ={positive} symbol ='%'/>
      </tbody>
      </table>
    </div>
  )
}

const StatisticLine =(props)=>
{
  return(
      <tr>
      <td>{props.text} </td>
      <td>{props.value}{props.symbol}</td>
      </tr>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


const App =()=>{
  const [good,setGood]=useState(0)
  const [neutral,setNeutral]=useState(0)
  const [bad,setBad]=useState(0)

  const handleGoodClick = () =>setGood(good + 1)
  const handleNeutralClick = () =>setNeutral(neutral + 1)
  const handleBadClick = () =>setBad(bad + 1)
 
  return(
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <h1>Statistics</h1>
      <Statistics good ={good} bad={bad} neutral={neutral}/>
      
    </div>
  )
}

export default App;
