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
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header title={course} />
      <Content title1={part1} sum1={exercises1} 
              title2={part2} sum2={exercises2}
              title3={part3} sum3={exercises3}
      />
      <Total value={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App