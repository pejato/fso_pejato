import { PropTypes } from "prop-types";
import { React, useState } from "react";
import './App.css'

// MARK: - App

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good+neutral+bad;
  const positivePercentage = all ? 
    (good/all).toLocaleString(undefined, {style: 'percent', minimumFractionDigits: 2}) 
    : 0


  const statistics = [
    {name: 'good', value: good},
    {name: 'neutral', value: neutral},
    {name: 'bad', value: bad},
    {name: 'all', value: all},
    {name: 'average', value: all ? (good-bad)/all : 0},
    {name: 'positive', value: positivePercentage},
  ]

  const feedbackTypes = [
    {name: 'good', onClick: () => setGood(good+1)},
    {name: 'neutral', onClick: () => setNeutral(neutral+1)},
    {name: 'bad', onClick: () => setBad(bad+1)},
  ]

  return (
    <div>
      <Feedback feedbackTypes={feedbackTypes} />
      <Statistics statistics={statistics}/>
    </div>
  )
}

// MARK: - Feedback

const Feedback = ({feedbackTypes}) => {
 return (
  <>
    <h1>give feedback</h1>
    {
      feedbackTypes.map(feedbackType => 
        <Button key={feedbackType.name} title={feedbackType.name} onClick={feedbackType.onClick} />
      )
    }
  </>
 ); 
}

// MARK: - Button

const Button = ({title, onClick}) => {
  return <button onClick={onClick}>{title}</button> ;
}

// MARK: - Statistics

const Statistics = ({statistics}) => {
  const header = <h1>statistics</h1>
  if (statistics.every(stat => stat.value === 0)) {
    return <>
      {header}
      <div>No feedback given</div>
    </> 
  }

  return (
    <>
      {header}
      <table className="table">
        <tbody>
          {
            statistics.map(stat => <StatisticsLine  key={stat.name} name={stat.name} value={stat.value} />)
          }
        </tbody>
      </table>
    </>
  ); 
 }

// MARK: - StatisticsLine

const StatisticsLine = ({name, value}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr>
  );
}

export default App