import Filter from './components/Filter';
import Button from './components/Button';
import React, { useState, useEffect } from 'react';
import personsService from './components/Persons';
import Notification from './components/Notification';
import Alert from './components/Alert';

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    personsService
      .GetAll()
        .then(initialPhonebook => {
        setPersons(initialPhonebook)
      })
  }, [])

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewFilter = (event) => {
    setNewFilter(event.target.value)
  }
  
  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName && person.number === newNumber)) {
      window.alert(`${newName} is already added to phonebook`)
    }
    else if (persons.some(person => person.name === newName)) {
      const personsObject = {
        name: newName, number: newNumber
      }
      const found = persons.find(person => person.name === newName)
      if (window.confirm(`Do you want to replace ${newName}'s old number with a new one?`)) { 
        personsService
        .Update(found.id, personsObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== found.id ? person : returnedPerson))
          setMessage(
            `${newName}'s number changed!`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setAlert(
            `the person '${newName}' was already deleted from server`
          )
          setTimeout(() => {
            setAlert(null)
          }, 5000)
          setPersons(persons.filter(n => n.id !== found.id))
        })
        setNewName('')
        setNewNumber('')
    }}

    else {
      const personsObject = {
        name: newName, number: newNumber
      }
      personsService
      .Create(personsObject)
        .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setMessage(
          `${newName} added to phonebook!`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setNewName('')
      })
      setNewNumber('')
    }
  }

  const removePerson = (id) => {
    const found = persons.find(person => person.id === id)
      if(window.confirm(`Delete ${found.name}?`)) {
        personsService
          .Remove(id)
          .then(returnedPerson => {
            setPersons(persons.filter(n => n.id !== id))
            setMessage(
              `${found.name} deleted!`
            )
            setTimeout(() => {
              setMessage(null)
              }, 5000)
          })
          .catch(error => {
            setAlert(
              `the person '${found.name}' was already deleted from server`
            )})
            setTimeout(() => {
              setAlert(null)
            }, 5000)
            setPersons(persons.filter(n => n.id !== id))
      }
        
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
      <Alert message={alert} />
      <h2>Filter</h2>
      <form>
        <div>
            filter with: <input value={newFilter}
            onChange={handleNewFilter} />
        </div>
      </form>
      <h2>Add new</h2>
      <form>
        <div>
          name: <input value={newName}
          onChange={handleNewName} />
        </div>
        <div>number: <input value={newNumber}
        onChange={handleNewNumber}/></div>
        <div>
          <Button handleClick={addPerson} text="add"/>
        </div>
      </form>
      <h2>Numbers</h2>
    <div>
      <Filter persons={persons} newFilter={newFilter} onDelete={removePerson}/>
    </div>
    </div>
  )
}

export default App
