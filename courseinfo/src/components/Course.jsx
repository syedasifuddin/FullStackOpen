const Header = ({course}) => {
    return <h1>{course.name}</h1>
  }
  
  const Part = ({part, excercise}) => {
    return <p>{part} {excercise}</p>
  }
  
  const Content = ({course}) => {
    return (
      <>
        {course.parts.map(part => <Part key={part.id} part={part.name} excercise={part.exercises}/>)}
      </>
    )
  }
  
  const Total = ({course}) => {
  
    const total = course.parts.reduce((a, b) => a + b.exercises, 0);
  
    return <h4>Total of {total} exercises</h4>
  }
  
  const Course = ({course}) => {
    return <>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course} />
    </>
  }

  export default Course;