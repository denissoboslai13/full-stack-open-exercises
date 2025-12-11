import { useState } from 'react'

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
        <form>
        <div>
          filter shown with <input onChange={handleFilterChange}/>
        </div>
      </form>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input onChange={handleNameChange}/>
        </div>
        <div>
          number: <input onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {newArr.map(people =>
            <div key={people.id}>{people.name} {people.number}</div>
        )}
    </div>
  )
}

export default App