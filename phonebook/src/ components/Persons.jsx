import Person from "./Person"

const Persons = ({personsToShow, onDelete}) => {
    return <>
        {personsToShow.map(person => <Person key={person.id} person={person} onClick={() => onDelete(person)}/>)}
    </>
}

export default Persons