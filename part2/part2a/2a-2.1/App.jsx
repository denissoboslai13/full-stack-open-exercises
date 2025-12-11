const Header = ({ name }) => <h1>{name}</h1>

const Content = ({ content }) => {
  console.log("content: ", content)
  return (
    content.map(contents =>
      <Part key={contents.id} parts={contents} />
    )
  )
}

const Part = ({ parts }) => {
  console.log("parts:", parts)
  return (
    <p>{parts.name} {parts.exercises}</p>
  )
}

const Course = ({ course }) => {
  console.log(course)
  return (
    <div>
      <Header name={course.name} />
      <Content content={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App