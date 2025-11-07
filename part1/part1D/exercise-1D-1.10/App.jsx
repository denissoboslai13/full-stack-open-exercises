import { useState } from 'react'

const TopText = () => <header style={{fontSize: "26px", fontWeight: "bold", paddingTop: "10px", paddingBottom: "25px"}}>give feedback</header>
const MidText = () => <div style={{fontSize: "32px", fontWeight: "bold", paddingTop: "20px", paddingBottom: "20px"}}>statistics</div>
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value, percent }) => {
  return <div>{text} {value} {percent}</div>
}
const Stats = ( props ) => {
    if (props.good === 0 && props.bad === 0 && props.neutral === 0) {
      return <div>No feedback given</div>
    }
    else {
      return (
        <div>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={props.all} />
          <StatisticLine text="average" value={props.average} />
          <StatisticLine text="positive" value={props.positive} percent = "%"/>
        </div>
      )
    }
  }

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)


  const setGoodValue = () => {
    const updatedGood = good + 1
    console.log("good value: ", updatedGood)
    setGood(updatedGood)
    setTotal(total + 1)
    setAverage(average + 1)
  }

  const setNeutralValue = () => {
    const updatedNeutral = neutral + 1
    console.log("neutral value: ", updatedNeutral)
    setNeutral(updatedNeutral)
    setTotal(total + 1)
  }

  const setBadValue = () => {
    const updatedBad = bad + 1
    console.log("bad value: ", updatedBad)
    setBad(updatedBad)
    setTotal(total + 1)
    setAverage(average - 1)
  }

  const averageValue = average / total
  const positiveValue = (good / total) * 100

  return (
    <div>
      <TopText />

      <Button onClick={setGoodValue} text="good" />
      <Button onClick={setNeutralValue} text="neutral" />
      <Button onClick={setBadValue} text="bad" />
      
      <MidText />

      <Stats text="good" good = {good} neutral = {neutral} 
      bad = {bad} all = {total} average = {averageValue} 
      positive = {positiveValue}/>
    </div>
  )
}

export default App