const mongoose =require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const newname = process.argv[3]
const newnumber = process.argv[4]

const url =`mongodb+srv://Vickson:${password}@phonebook.mzr6f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority `

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: Number
})

const Person = mongoose.model('Person',personSchema)

if(process.argv.length===3)
{
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => console.log(`${person.name} ${person.number}`))
    mongoose.connection.close()
  })
}
else
{
  const person = new Person(
    {
      name: newname,
      number: newnumber
    }
  )

  person.save()
    .then(() => {
      console.log(`added ${newname} ${newnumber} to phonebook`)
      mongoose.connection.close()
    })

}
