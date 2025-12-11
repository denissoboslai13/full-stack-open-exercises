const Header = () => <h1>Web development curriculum</h1>

const Titles = ({ name }) => <h2>{name}</h2>

const Total = ({ total }) => <p><b> toal of {total} exercises </b></p>

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
      <Titles name={cons.name} />
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
      <Header />
      {course.map(parts =>
        <Content key={parts.id} content={parts} />
      )}
    </div>
  )
}

export default Course