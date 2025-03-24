const Person = ({ person, deleteP }) => {
    return (
        <div>
            {person.name} {person.number} <button onClick={() => deleteP(person.id)}>delete</button>
        </div>
    )
}
  
export default Person