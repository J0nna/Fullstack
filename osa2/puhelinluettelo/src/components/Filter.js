import React from 'react';
import Person from './Person'; 


const Filter = ({persons, newFilter, onDelete}) => {
  const filtered = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  return(<div>
    {filtered.map((person) => 
      <Person key={person.name} person={person} onDelete={() => onDelete(person.id)}/>
    )} 
</div>)

}


export default Filter;