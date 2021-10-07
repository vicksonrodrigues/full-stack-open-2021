import React, { useState,useEffect } from 'react'
import DisplayCountries from './components/DisplayCountries'
import Filter from './components/Filter'
import axios from 'axios'


const App = () => {
  const [allCountries, setAllCountries ] = useState([]) 
  const [find,setFind]=useState('')
  const [countries, setCountries]=useState([])

  useEffect(()=>{
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response=>{
      console.log('promise fulfilled at App')
        setAllCountries(response.data)
    })

  },[])


  return (
    <div>
      <h1>Countries</h1>
      <Filter 
        value={find}
        setFind={setFind}
        allCountries={allCountries}
        setCountries={setCountries}
      />
      <h2>Result</h2>
      <DisplayCountries countries={countries} setCountries={setCountries}/>
    </div>
  )
}

export default App