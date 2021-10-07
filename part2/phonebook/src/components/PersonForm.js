import React from 'react'

const PersonForm =({newContact,newName,newNumber,handleNameChange,handleNumberChange})=>
{

return(
<div>
    <form onSubmit={newContact}>
          <div>Name: <input value={newName} onChange={handleNameChange} /></div>
          <div>Number: <input value={newNumber} onChange={handleNumberChange}/></div>
          <div><button type="submit">Add Information</button></div>
    </form>
</div>

)}
export default PersonForm;