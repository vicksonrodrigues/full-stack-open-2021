import React, { useState,useEffect } from 'react'
import Filter from './components/Filter'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('') 
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterChanges,setFilterChanges ]= useState('')
  const [ allPersons,setAllPersons] = useState([])
  const [ message,setMessage] = useState(null)
  
  useEffect(()=>{
    personService
    .getAll()
    .then(initialPersons => {
      setAllPersons(initialPersons)
    })
  },[])

  const handleFilterChange=(event)=>
  {
    setFilterChanges(event.target.value)
    const result = allPersons.filter((person)=>
    person.name.toLowerCase().match(event.target.value.toLowerCase()))
    setPersons(result)
  }

  const handleNameChange=(event)=>
  {
    setNewName(event.target.value)
  }

  const handleNumberChange=(event)=>
  {
  setNewNumber(event.target.value)
  }

  const newContact=(event)=>
  {
    event.preventDefault()

    const details={
      name:newName,
      number:newNumber
    }
    const existingUser = findExistingUser(details)
    if(existingUser.length!== 0)
    {
      updateUser(existingUser[0].id) 
    }
    else
    {
      addUser(details)
    }
  
    setNewName('')
    setNewNumber('')
      
    
  }

  const findExistingUser=(details)=>
  {
    const existingUser=allPersons.filter((person)=>
    person.name.toLowerCase().match(newName.toLowerCase()))
    return(
      existingUser
    )
  }
   
  const updateUser =(id)=>
  {
    const person = allPersons.find(person =>person.id === id)
    const updatePerson ={...person,number:newNumber}
    if(window.confirm(`${newName} is already added to phonebook,replace the old number with a new one`))
    {
      personService
      .update(id,updatePerson)
      .then(returnedPerson=>{
        setAllPersons(allPersons.map(person => person.id !==id ? person : returnedPerson))
        setMessage(`${updatePerson.name} was successfully updated`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch((error) => {
        console.log(error)
        setAllPersons(allPersons.filter(person => person.id !== updatePerson.id))
        setMessage(
          `[ERROR] ${updatePerson.name} was already deleted from server`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })

    }
  }

  const addUser =(info)=>
  {
    personService
      .create(info)
      .then(returnedPerson => {
      setAllPersons(allPersons.concat(returnedPerson))
      setMessage(
      `${newName} was successfully added`
      )
      setTimeout(() => {
      setMessage(null)
      }, 5000)
      })
      .catch(error => {
        setMessage(
          `[ERROR] ${error.response.data.error}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        console.log(error.response.data)
      })

  }

  const removeDetails =(id)=>{
    const filteredPerson = allPersons.filter(person => person.id === id)
    const personName = filteredPerson[0].name
    const personId = filteredPerson[0].id
    if (window.confirm(`Delete ${personName} ?`)) {
      personService
      .remove(personId)
      .then(()=>{
        setAllPersons(allPersons.filter(person => person.id !== personId))
        setPersons(persons.filter(person => person.id !== personId))
        setMessage(
          `${personName} was successfully deleted`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch((error) => {
        console.log(error)
        setAllPersons(allPersons.filter(person => person.id !== personId))
        setPersons(persons.filter(person => person.id !== personId))
        setMessage(
          `[ERROR] ${personName} was already deleted from server`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      
      
    }
  }



return(
  <div>
    <h1>PhoneBook</h1>

    <Notification message={message} />

    <h2>Search Contact</h2>
    <Filter 
    filterChanges={filterChanges} 
    handleFilterChange={handleFilterChange} 
    />

    <h2>Add new Contact</h2>
    <PersonForm
      newContact={newContact}
      newName={newName}
      newNumber={newNumber}
      handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange}
    />
    <h2>Contacts</h2>
    <Person
    persons={persons}
    allPersons={allPersons}
    removeDetails={removeDetails}
    />

  </div>
)
}
export default App