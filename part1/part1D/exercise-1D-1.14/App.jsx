import { useState } from 'react'

function getRandomInt() {
    const minCeiled = 0
    const maxFloored = 7
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
  }

const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]


const Text = (props) => {
  if (props.value === 0){
    return <div style={{fontWeight: "bold", fontSize: "25px", paddingTop: "15px", paddingBottom: "15px"}}>Anecdote of the day</div>
  }
  else {
    return <div style={{fontWeight: "bold", fontSize: "25px", paddingTop: "15px", paddingBottom: "15px"}}>Anecdote with the most votes</div>
  }
}

const MostVotes = (props) => {
  console.log(anecdotes[props.index], props.value)
  return (
    <div>
      {anecdotes[props.index]}
      <div>has {props.value} votes</div>
    </div>
  )
}

const votes = new Uint8Array(anecdotes.length); 

const copy = [...votes]

const Display = (props) => <div>has {props.value} votes</div>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {

  const [selected, setSelected] = useState(0)

  const setSelectedValue = () => {
    const x = getRandomInt()
    console.log("selected anecdote: ", x)
    setSelected(x)
    console.log(largest)
  }

  const changeVote = () => {
    copy[selected] += 1   
    console.log("votes for anecdote number", selected, ": ", copy[selected])
  }

  const largest = Math.max(...copy)
  const indexOfLargest = copy.indexOf(largest);

  return (
    <div>
      <Text value={0} />
      <div>{anecdotes[selected]}</div>
      <Display value={copy[selected]}/>
      <Button onClick = {changeVote} text = "vote"></Button>
      <Button onClick = {setSelectedValue} text = "next anecdote"></Button>
      <Text value={1} />
      <MostVotes index={indexOfLargest} value={largest}/>
    </div>
  )
}

export default App