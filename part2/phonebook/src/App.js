import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState([]);


  const handeChangeFilter = (filterValue) => {
    const newArry = persons.filter((person) => (
      person.name.toLowerCase().includes(filterValue.toLowerCase())
    ))
    setFilteredPersons(newArry)
  }


  const handleSetPersons = (person) => {
    setPersons(persons.concat(person))
  }

  const fetchData = () => {
    axios
      .get('http://localhost:3001/persons')
      .then((res) => {
        setPersons(res.data)
      })
  }
  useEffect(fetchData, [])

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