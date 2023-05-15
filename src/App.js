import userEvent from '@testing-library/user-event'
import { useState, useSyncExternalStore } from 'react'

const Display = ({counter}) => <div>{counter}</div>

const Button = (props) => <div><button onClick={props.method}>{props.text}</button></div>

const Statistics = (props) => {
  if (props.good === 0 && props.bad === 0 && props.neutral === 0) {
    return (
      <div>
        <Display counter={'No statistics for now'} />
      </div>
    )
  } else {
    return (
      <div>
        <Display counter={`Good ${props.good}`}/>
        <Display counter={`Neutral ${props.neutral}`}/>
        <Display counter={`Bad ${props.bad}`}/>

        <span><Display counter={`Average ${(props.good - props.bad) / (props.good + props.bad + props.neutral)}`}/></span>
        <span><Display counter={`Positive ${(props.good / (props.good + props.neutral + props.bad)) * 100}%`}/></span>
      </div>
    )

  }
}

const App = (props) => {
  const [ good, setGood ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad] = useState(0)
  console.log(bad, good, neutral)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <Button method={increaseGood} text="Good" />
      <Button method={increaseNeutral} text="Neutral" />
      <Button method={increaseBad} text="Bad" />
      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
}

export default App;
