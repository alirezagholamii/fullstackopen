import React from 'react'

const Persons = ({ persons, handleDelete }) => {
  return (
    <>
      {persons.map((person) => {
        return (<div key={person.name}>{person.name} {person.number} <button onClick={() => { handleDelete(person) }}>delete</button></div>)
      })}
    </>
  )
}

export default Persons