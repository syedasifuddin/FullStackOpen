import { useEffect, useState } from 'react'
import personService from './services/persons'
import Filter from './ components/Filter'
import PersonForm from './ components/PersonForm'
import Persons from './ components/Persons'
import Notification from './ components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [className, setClassName] = useState(null)


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const person = persons.find(person => person.name === newName)
    if (person) {
      if (window.confirm(`${person.name} is already added to the phonebook, replace the old number with a new one?`)) {
        person.number = newNumber
        personService
          .update(person.id, person)
          .then(returnedPerson => {
            setPersons(persons.map(per => per.id !== person.id ? per : returnedPerson))
            setNewName('')
            setNewNumber('')
            setMessage(`Updated ${returnedPerson.name}`)
            setClassName("success")
            setTimeout(() => {
              setMessage(null)
              setClassName(null)
            }, 5000)
          }).catch(() => {
            setMessage(
              `Information of '${person.name}' was already removed from server`
            )
            setClassName("error")
            setTimeout(() => {
              setMessage(null)
              setClassName(null)
            }, 5000)
          })
      }
    } else {
      const personObj = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      personService
        .create(personObj)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage(`Added ${returnedPerson.name}`)
          setClassName("success")
          setTimeout(() => {
            setMessage(null)
            setClassName(null)
          }, 5000)
        })  
    }
  }

  const deletePerson = (persontoDelete) => {
    if (window.confirm(`Delete ${persontoDelete.name} ?`))
    personService
      .del(persontoDelete.id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== persontoDelete.id))
      })
      .catch(() => {
        setMessage(
          `Information of '${persontoDelete.name}' was already removed from server`
        )
        setClassName("error")
        setTimeout(() => {
          setMessage(null)
          setClassName(null)
        }, 5000)
      })
  }

  const filterChange = (event) => {
    setFilter(event.target.value)
  }

  const nameChange = (event) => {
    setNewName(event.target.value)
  }

  const numberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} className={className}/>
      <Filter value={filter} onChange={filterChange}/>
      <h2>add a new</h2>
      <PersonForm onSubmit={addPerson} name={newName} number={newNumber} setName={nameChange} setNumber={numberChange}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} onDelete={deletePerson}/>
    </div>
  )
}

export default App