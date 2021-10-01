import React from 'react'

const App = () => {
  const Header = (props) => (<h1>{props.course.name}</h1>);
  const Part = (props) => (<p>{props.part.name} {props.part.exercises}</p>);
  const Content = (props) => (
    <div>
      <Part part={props.course.parts[0]} />
      <Part part={props.course.parts[1]} />
      <Part part={props.course.parts[2]} />
    </div>
  )
  const Total = (props) => {
    return (<p>Number of exercises {props.course.parts.reduce((previousValue, { exercises }) => {
      return (exercises + previousValue)
    }, 0
    )}</p>)
  }

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App