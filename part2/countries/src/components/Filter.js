import React from "react";

const Filter=({value,setFind,allCountries,setCountries})=>
{

const handleFindChange=(event)=>{
    setFind(event.target.value)
    findCountries(event)
  }
  
  const findCountries =(event)=>{
  const countriesFound =allCountries.filter
  (
    (country)=>
    country.name.common.toLowerCase().match
    (
      event.target.value.toLowerCase()
    )
  )
  setCountries(countriesFound)
  }

return(
    <div>
        Find Countries: <input value={value} onChange={handleFindChange}/> 
    </div>
)

}

export default Filter