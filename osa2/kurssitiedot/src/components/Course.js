import React from 'react'

const Header = ({ course }) => {
    return (
      <h3>{course.name}</h3>
    )
  }
  
  const Total = ({ parts }) => {
    const total = parts.reduce(
      (sum, current) => sum + current.exercises,
      0 
    );
    return <p><b>Total of exercises: {total}</b></p>;
  }
  
  
  const Part = ({ part }) => {
    return (
      <p>
      {part.name} {part.exercises}
      </p>    
    )
  }
  
  const Course = ({ course }) => {
    return (
      <div>
          <Header course={course}/>
          {course.parts.map(part => 
            <Part key={part.id} part={part} />
          )}
          <Total parts={course.parts}/>
      </div>
    )
  }

  export default Course