import React from 'react'

const Persons = ({ persons }) => {
  return (
    <>
      {persons.map((person)=>{
        return(<div key={person.name}>{person.name} {person.number}</div>)
      })}
    </>
  )
}

export default Persons