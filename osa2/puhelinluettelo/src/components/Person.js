import React from 'react';
import Button from './Button';

const Person = ({person, onDelete}) => {
  return (
    <p>{person.name} {person.number} 
    <Button handleClick={onDelete} text="delete"/>
    </p>
    )
  }


export default Person;