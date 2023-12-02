import { useState } from 'react'

const StatisticLine = ({text, value}) => {
  return <tr><td>{text}</td><td>{value}</td></tr>
}

const Button = ({text, onClick}) => {
  return <button onClick={onClick}>{text}</button>
}

const Statistics = ({good, neutral, bad}) => {

  const total = good + neutral + bad;

  if (total == 0) {
    return <>No feedback given</>
  }

 return <table>
    <tbody>
      <StatisticLine text={"good"} value={good}/>
      <StatisticLine text={"neutral"} value={neutral}/>
      <StatisticLine text={"bad"} value={bad}/>
      <StatisticLine text={"all"} value={good+neutral+bad}/>
      <StatisticLine text={"average"} value={(good - bad) / (total)}/>
      <StatisticLine text={"positive"} value={((good) / (total)) * 100}/>
    </tbody>
  </table>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text={"good"} onClick={() => {setGood(good+1)}}/>
      <Button text={"neutral"} onClick={() => {setNeutral(neutral+1)}} />
      <Button text={"bad"} onClick={() => {setBad(bad+1)}} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App