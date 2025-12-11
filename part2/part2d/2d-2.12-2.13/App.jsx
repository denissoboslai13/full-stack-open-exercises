import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Forms from './components/Forms'
import Persons from './components/Persons'
import noteService from './services/notes'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newArr, setNewArr] = useState(persons)

  const hook = () => {
    noteService
      .getAll()
      .then(initialPeople => {
        console.log('promise fulfilled')
        console.log("data from server: ", initialPeople)
        setNewArr(initialPeople)
        setPersons(initialPeople)
      })
  }

  useEffect(hook, [])

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    const names = persons.map(people => people.name)
    console.log(names)

    if (names.includes(newName)){
      alert(`${newName} is already added to phonebook`)
    }
    else {
      noteService
        .create(nameObject)
        .then(returnedPeople => {
          setPersons(persons.concat(returnedPeople))
          setNewArr(newArr.concat(returnedPeople))
        })
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewArr(persons)
    const filter = event.target.value
    const newData = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    setNewArr(newData)


  //   const filterNames = persons.map(people => people.name)

  //   if (filterNames[0].includes(filter)){
  //     setPersons(filterNames)
  //   }

  //   console.log("persons: ", persons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilterChange}/>
      <h2>add a new</h2>
      <Forms onSubmit={addName} handleName={handleNameChange} handleNumber={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons arr={newArr} />
    </div>
  )
}

export default App