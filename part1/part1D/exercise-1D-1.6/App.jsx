import { useState } from 'react'

const TopText = () => <header style={{fontSize: "26px", fontWeight: "bold", paddingTop: "10px", paddingBottom: "25px"}}>give feedback</header>
const MidText = () => <div style={{fontSize: "32px", fontWeight: "bold", paddingTop: "20px", paddingBottom: "20px"}}>statistics</div>
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Stats = ({ text, value }) => <div>{text} {value}</div>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setGoodValue = () => {
    const updatedGood = good + 1
    console.log("good value: ", updatedGood)
    setGood(updatedGood)
  }

  const setNeutralValue = () => {
    const updatedNeutral = neutral + 1
    console.log("neutral value: ", updatedNeutral)
    setNeutral(updatedNeutral)
  }

  const setBadValue = () => {
    const updatedBad = bad + 1
    console.log("bad value: ", updatedBad)
    setBad(updatedBad)
  }

  return (
    <div>
      <TopText />

      <Button onClick={setGoodValue} text="good" />
      <Button onClick={setNeutralValue} text="neutral" />
      <Button onClick={setBadValue} text="bad" />

      <MidText />

      <Stats text="good" value = {good} />
      <Stats text="neutral" value = {neutral} />
      <Stats text="bad" value = {bad} />
    </div>
  )
}

export default App