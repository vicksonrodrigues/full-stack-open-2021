import React from 'react'

const Course =({courses})=>{
    return (
      <div>
        {courses.map( course=>
        <div key ={course.id}>
        <Header  course={course} />
        <Content  course={course} />
        <Total course={course} />
        </div>
            
        )}
      </div>
    )
  
  }
  
  const Header = ({ course }) => {
  
    return (
      <div>
        <h2>{course.name} </h2>
      </div>
     
    )
  }
  
  const Content =({course}) => {
    return (
      <div>
        {course.parts.map( parts=> 
        <Part key ={parts.id} parts={parts} />     
        )} 
      </div>
    )
  }
  
  const Part =({parts}) => {
    return(
      <p>{parts.name} {parts.exercises}</p>
    )
  }
  
  
  
  
  const Total = ({ course }) => 
  {
    const totalExercises =course.parts.reduce((previousExercise,currentExercise) => 
    previousExercise + currentExercise.exercises,0)
  
  return(
    <div>
      <b>Total Exercise : {totalExercises}</b>
    </div>
  ) 
  }

  export default Course