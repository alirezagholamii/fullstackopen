import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' }
  ])
  const [filteredPersons, setFilteredPersons] = useState([{ name: 'Arto Hellas', number: '040-123456' }]);


  const handeChangeFilter = (filterValue) => {
    const newArry = persons.filter((person) => (
      person.name.toLowerCase().includes(filterValue.toLowerCase())
    ))
    setFilteredPersons(newArry)
  }


  const handleSetPersons = (person) => {
    setPersons(persons.concat(person))
  }

  useEffect(() => {
    setFilteredPersons(persons.concat())
  }, [persons]);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handeChangeFilter={handeChangeFilter} />
      <h3>Add a new</h3>
      <PersonForm handleSetPersons={handleSetPersons} persons={persons} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App