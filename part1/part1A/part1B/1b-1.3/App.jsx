const Header = (props) => {
  console.log(props)
  return(
    <div>
      <h1>
        {props.title}
      </h1>
    </div>
  )
}

const Part1 = (props) => {
  console.log(props)
  return(
    <p>
      {props.title} {props.sum}
    </p>
  )
}

const Part2 = (props) => {
  console.log(props)
  return(
    <p>
      {props.title} {props.sum}
    </p>
  )
}

const Part3 = (props) => {
  console.log(props)
  return(
    <p>
      {props.title} {props.sum}
    </p>
  )
}


const Content = (props) => {
  console.log(props)
  return(
    <div>
      <Part1 title={props.title1} sum={props.sum1}/>
      <Part2 title={props.title2} sum={props.sum2}/>
      <Part3 title={props.title3} sum={props.sum3}/>
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  return (
    <p>
      Number of exercises {props.value}
    </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10}

  const part2 = {
    name: 'Using props to pass data',
    exercises: 7}

  const part3 = {
    name: 'State of a component',
    exercises: 14}

  return (
    <div>
      <Header title={course} />
      <Content title1={part1.name} sum1={part1.exercises} 
              title2={part2.name} sum2={part2.exercises}
              title3={part3.name} sum3={part3.exercises}
      />
      <Total value={part1.exercises + part2.exercises + part3.exercises}/>
    </div>
  )
}

export default App