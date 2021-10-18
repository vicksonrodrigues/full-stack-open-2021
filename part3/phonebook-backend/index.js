const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const morgan = require('morgan')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
//server request log
morgan.token('data',(request,response) => {
  return JSON.stringify(request.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

//Get Info of User
app.get('/info', (request, response) => {
  const date= new Date()
  Person.find({}).then(persons => {
    response.send(`
        <div>
            <p>Phonebook has info for ${persons.length} people</p>
        </div>
        <div>
            <p>${date}</p>
        </div>`)
  })
})

//Get all User from Database
app.get('/api/persons', (request, response) =>
{
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

//Search user from database
app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

//Delete user from database
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


//Add user to database
app.post('/api/persons',(request,response,next) => {
  const body = request.body

  if (!body.name||!body.number) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const person = new Person({
    name: body.name,
    number:body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
    .catch(error => next(error))
})

//Update user in database
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name:body.name,
    number:body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators:true ,context:'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT,() => {
  console.log(`Server running on port ${PORT}`)
})