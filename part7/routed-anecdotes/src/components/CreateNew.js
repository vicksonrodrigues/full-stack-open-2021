import React from 'react'
import { useField } from "../hooks"

const CreateNew = (props) => {
  
    const {reset:resetContent,...content} = useField('text')
    const {reset:resetAuthor,...author} = useField('text')
    const {reset:resetInfo,...info} = useField('text')
  
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content:content.value,
        author:author.value,
        info:info.value,
        votes: 0
      })
    }
  
    const handleReset =()=>
    {
      resetAuthor()
      resetContent()
      resetInfo()
    }
  
    return (
      <div>
        <h2>Create a New Anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            Content:
            <input {...content}/>
          </div>
          <div>
            Author:
            <input {...author} />
          </div>
          <div>
            url for more info
            <input {...info} />
          </div>
          <button type='submit'>create</button>
          <button type='reset' onClick={handleReset}>reset</button>
        </form>
      </div>
    )
  
  }

export default CreateNew