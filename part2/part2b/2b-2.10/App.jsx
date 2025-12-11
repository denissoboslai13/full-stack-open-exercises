import { useState } from 'react'
import Filter from './components/Filter'
import Forms from './components/Forms'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])


  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newArr, setNewArr] = useState(persons)

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1)
    }

    const names = persons.map(people => people.name)
    console.log(names)

    if (names.includes(newName)){
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat(nameObject))
      setNewArr(newArr.concat(nameObject))
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