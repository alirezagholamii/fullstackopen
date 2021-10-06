import React, { useState } from 'react'

const PersonForm = ({ persons, handleSetPersons }) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleChangeName = (event) => {
        setNewName(event.target.value)
    }
    const handleChangeNumber = (event) => {
        setNewNumber(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (newName === '') {
            return
        }

        const isDuplicate = persons.some((person) => person.name === newName)
        if (isDuplicate) {
            const message = `${newName} is already added to phonebook`;
            alert(message);
            return
        }
        setNewName('')
        console.log('5555555',newName);
        setNewNumber('')
        handleSetPersons({ name: newName, number: newNumber })
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                name: <input value={newName} onChange={handleChangeName} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleChangeNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm