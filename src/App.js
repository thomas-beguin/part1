import userEvent from '@testing-library/user-event'
import { useState, useSyncExternalStore } from 'react'

const Display = ({counter}) => <div>{counter}</div>

const Button = (props) => <div><button onClick={props.method}>{props.text}</button></div>

const App = (props) => {
  const [ good, setGood ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <Button method={increaseGood} text="Good" />
      <Button method={increaseNeutral} text="Neutral" />
      <Button method={increaseBad} text="Bad" />
      <h1>Statistics</h1>
      <Display counter={`Good ${good}`}/>
      <Display counter={`Neutral ${neutral}`}/>
      <Display counter={`Bad ${bad}`}/>

      <span><Display counter={`Average ${(good - bad) / (good + bad + neutral)}`}/></span>
      <span><Display counter={`Positive ${(good / (good + neutral + bad)) * 100}%`}/></span>
    </div>
  );
}

export default App;
