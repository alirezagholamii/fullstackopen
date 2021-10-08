import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import api from './services/api'


const App = () => {
  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)



  const handeChangeFilter = (filterValue) => {
    const newArry = persons.filter((person) => (
      person.name.toLowerCase().includes(filterValue.toLowerCase())
    ))
    setFilteredPersons(newArry)
  }

  const setNotification = (msg, type) => {
    setMessage(msg)
    setMessageType(type)
  }


  const handleSetPersons = (person) => {
    api.addPerson(person)
      .then((data) => {
        setNotification(`Added ${person.name}`, 'success')
        setPersons(persons.concat(data))
        setTimeout(() => {
          setNotification(null, null)
        }, 5_000);
      })
      .catch((e) => {
        console.log(e);
      })
  }

  useEffect(() => {
    api.getPersons()
      .then((data) => {
        setPersons(data)
      })
      .catch((e) => {
        console.log(e);
      })
  }, [])

  useEffect(() => {
    setFilteredPersons(persons.concat())
  }, [persons]);

  const handleDeletePerson = (person) => {
    const isConfirm = window.confirm(`Delete ${person.name} ?`)
    if (isConfirm) {
      api.deletePerson(person)
        .then((res) => {
          const newPersons = persons.filter(item => item.id !== person.id)
          setPersons(newPersons)
        })
        .catch((e) => {
          console.log(e);

          setNotification(`Information of ${person.name} has already been removed from server`, 'error')
          setTimeout(() => {
            setNotification(null, null)
          }, 5_000);
        })
    }
  }
  const handleUpdatePerson = (person) => {
    let id = ''
    for (const item of persons) {
      if (item.name === person.name) {
        id = item.id
      }
    }
    api.updatePerson(id, person)
      .then((res) => {
        const newPersons = persons.map((item) => {
          if (item.id === res.id) {
            return res
          }
          return item
        })
        setPersons(newPersons)
      })
      .catch((e) => {
        console.log(e);
      })
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messageType={messageType} />
      <Filter handeChangeFilter={handeChangeFilter} />
      <h3>Add a new</h3>
      <PersonForm handleSetPersons={handleSetPersons} persons={persons} handleUpdatePerson={handleUpdatePerson} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} handleDelete={handleDeletePerson} />
    </div>
  )
}

export default App