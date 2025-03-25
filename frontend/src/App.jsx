import { useState, useEffect } from 'react'
import Person from './components/Person'
import personService from './services/persons'
import NotificationS from './components/NotificationS'
import NotificationE from './components/NotificationE'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])
  
  const handlePersonChange = (event) => {
    setNewPerson(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newPerson,
      number: newNumber
    }

    if (persons.some((person) => person.name === newPerson)) {
      window.alert(`${newPerson} is already added to phonebook`)
      personService.update(persons.find((person) => person.name === newPerson).id, personObject).then((returnedPerson) => {
          setPersons(persons.map((person) => person.id !== returnedPerson.id ? person : returnedPerson))
          setNewPerson('')
          setNewNumber('')
          setSuccessMessage(
            `Updated '${returnedPerson.name}'`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
      .catch(error => {
        setErrorMessage(error.response.data.error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      })
    } else {
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
        setNewPerson('')
        setNewNumber('')
        setSuccessMessage(
          `Added '${returnedPerson.name}'`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(`Failed to update '${newPerson}'`);
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        console.log(error.response.data.error)
      })
    }
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.deleteP(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id))
      })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <NotificationS message={successMessage} />
      <NotificationE message={errorMessage} />
      filter shown with <input value={newFilter} onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <ul>
          <p>name: <input value={newPerson} onChange={handlePersonChange} /></p>
          <p>number <input value={newNumber} onChange={handleNumberChange} /></p>
          <p><button type="submit">save</button></p>
        </ul>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())).map((person) =>
          <Person key={person.id} person={person} deleteP={deletePerson}/>
        )}
      </ul>
    </div>
  )
}

export default App