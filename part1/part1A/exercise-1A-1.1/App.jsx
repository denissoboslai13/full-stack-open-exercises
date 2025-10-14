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

const Content = (props) => {
  console.log(props)
  return(
    <div>
      <p>
        {props.title1} {props.sum1}
      </p>
      <p>
        {props.title2} {props.sum2}
      </p>
      <p>
        {props.title3} {props.sum3}
      </p>
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