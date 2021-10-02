import React, { useState } from 'react'

const Button = ({ text, clickHandler }) => {
  return (
    <button onClick={clickHandler}>
      {text}
    </button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td> {text}</td>
      <td> {value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  if (all === 0) {
    return (
      <div>
        <p>no feedback given</p>
      </div>
    )
  }
  const average = (good - bad) / all;
  const positive = good * 100 / all + '%';
  return (
    <div>
      <table>
        <thead></thead>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive " value={positive} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClickHanlder = () => {
    setGood(good + 1)
  }
  const neutralClickHanlder = () => {
    setNeutral(neutral + 1)
  }
  const badClickHanlder = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" clickHandler={goodClickHanlder} />
      <Button text="neutral" clickHandler={neutralClickHanlder} />
      <Button text="bad" clickHandler={badClickHanlder} />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App