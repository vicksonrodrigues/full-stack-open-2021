import React from 'react'


const Person =({removeDetails,persons,allPersons})=>{

if(persons.length !==0)
{  
  return(
    <div>
        <ul>
          {persons.map(person => 
          <li key={person.id}>
            {person.name}&nbsp;
            {person.number}&nbsp;
            <button onClick={()=>removeDetails(person.id,person.name)}>
              delete
            </button>
          </li>
          )}
        </ul>
    </div>
  )
}
else{
  return(
    <div>
        
        <ul>
          {allPersons.map(person => 
          <li key={person.id}>
            {person.name}&nbsp;
            {person.number}&nbsp;
            <button onClick={()=>removeDetails(person.id,person.name)}>
              delete
            </button>
          </li>
          )}
        </ul>
    </div>
  )

}

}
export default Person;