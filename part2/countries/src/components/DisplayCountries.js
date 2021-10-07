import React from "react"
import CountryDetails from "./CountryDetails"

const DisplayCountries=({countries,setCountries})=>{
    if(countries.length >= 10)
    return(
      <div>
        Too many matches,specify another filter
      </div>
      )
    else if (countries.length === 1)
    return(
      <CountryDetails country ={countries[0]}/>
    )
    else if (countries.length >0 && countries.length<=10)
    return(
      <div>
        {countries.map(country => 
        <div key={country.cca2}>
            {country.name.common}&nbsp;
            <button value={country} onClick={()=>setCountries([country])}>Show details</button>
        </div>
      )}
      </div>
      )
    else
    return(
        <div>
            No Country Found , specify appropriate filter
        </div>
    )
  

  }

  export default DisplayCountries