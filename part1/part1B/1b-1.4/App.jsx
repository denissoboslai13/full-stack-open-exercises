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
  const parts = [
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
  return (
    <div>
      <Header title={course} />
      <Content title1={parts[0].name} sum1={parts[0].exercises} 
              title2={parts[1].name} sum2={parts[1].exercises}
              title3={parts[2].name} sum3={parts[2].exercises}
      />
      <Total value={parts[0].exercises + parts[1].exercises + parts[2].exercises}/>
    </div>
  )
}

export default App