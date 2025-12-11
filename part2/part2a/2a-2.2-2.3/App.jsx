const Header = ({ name }) => <h1>{name}</h1>

const Total = ({ total }) => <p> toal of {total} exercises </p>

const Content = (props) => {
  const cons = props.content
  const content = cons.parts
  console.log("props: ", content)

  const arrTotal = content.map(totals => totals.exercises)
  console.log(arrTotal)

  const total = arrTotal.reduce((x, y) => x + y)
  console.log(total)

  return (
    <div>
      <Header name={cons.name} />
      {content.map(contents =>
        <Part key={contents.id} parts={contents} />
      )}
      <Total total={total} />
    </div>
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
      <Content content={course} />
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