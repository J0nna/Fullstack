import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
  if (props.good===0&&props.neutral===0&&props.bad===0) {
    return(
      <div>
        <StatisticLine text="No feedback given" /> 
      </div>
    )
  }
  return(
    <div>
      <table>
      <tbody>
      <tr><td><StatisticLine text="good"/></td><td><StatisticLine value ={props.good} /></td></tr> 
      <tr><td><StatisticLine text="neutral"/></td><td><StatisticLine value ={props.neutral} /></td></tr> 
      <tr><td><StatisticLine text="bad"/></td><td><StatisticLine value ={props.bad} /></td></tr> 
      <tr><td><StatisticLine text="all"/></td><td><StatisticLine value ={props.bad+props.good+props.neutral} /></td></tr> 
      <tr><td><StatisticLine text="average"/></td><td><StatisticLine value ={(-1*props.bad+1*props.good+0*props.neutral)/(props.bad+props.good+props.neutral)} /></td></tr> 
      <tr><td><StatisticLine text="positive"/></td><td><StatisticLine value ={props.good/(props.bad+props.good+props.neutral)*100} text2="%"/></td></tr> 
      </tbody>
      </table>
    </div>
  )
}

const StatisticLine = (props) => {
  return(
    <div>
      <span>{props.text} {props.value} {props.text2}</span>
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good +1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral +1)} text="neutral"/>
      <Button handleClick={() => setBad(bad +1)} text="bad"/>
      <h1>Statistics</h1>
      <Statistics good={good}bad={bad}neutral={neutral}/>
    </div>
  )
}


ReactDOM.render(<App />, 
  document.getElementById('root')
)