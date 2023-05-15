import userEvent from '@testing-library/user-event'
import { useState, useSyncExternalStore } from 'react'

const Display = ({counter}) => <div>{counter}</div>
const Tr = ({title, value}) => <tr><th>{title}</th><th>{value}</th></tr>
const Anecdote = (props) => <div>{props.anecdote}</div>

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
        <table>
          <tbody>
            <Tr title={'Good'} value = {props.good}/>
            <Tr title={'Neutral'} value = {props.neutral}/>
            <Tr title={'Bad'} value = {props.bad}/>

            <Tr title={'Average'} value = {(props.good - props.bad) / (props.good + props.bad + props.neutral)}/>
            <Tr title={'Positive'} value = {`${(props.good / (props.good + props.neutral + props.bad)) * 100}%`}/>
          </tbody>
        </table>
      </div>
    )

  }
}

const App = (props) => {
  const [ good, setGood ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad] = useState(0)
  const [ selected, setSelected] = useState(0)

  const [anecdotes, setAnecdotes] = useState({
    'If it hurts, do it more often.': 0,
    'Adding manpower to a late software project makes it later!': 0,
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.': 0,
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.': 0,
    'Premature optimization is the root of all evil.': 0,
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.': 0,
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.': 0,
    'The only way to go fast, is to go well.':0
  })
  // const [ votes, setVotes] = useState(Object.values(anecdotes))

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)
  const randomAnecdote = () => {
    let rand = Math.floor(Math.random()*Object.keys(anecdotes).length)
    setSelected(rand)
  }
  const [LargestAnectode, setLargest] = useState("")

  let copy = {...anecdotes}

  const likeAnecdote = () => {
    copy[Object.keys(copy)[selected]]++
    setAnecdotes(copy)
    if (copy[Object.keys(copy)[selected]] >= Math.max(...Object.values(copy))) {
      setLargest(Object.keys(copy)[selected])
    }
  }

  return (
    <div>
      <Button method={increaseGood} text="Good" />
      <Button method={increaseNeutral} text="Neutral" />
      <Button method={increaseBad} text="Bad" />
      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
      <Button method={randomAnecdote} text='Next one'/>
      <Anecdote anecdote={Object.keys(anecdotes)[selected]} />
      <Anecdote anecdote={Object.values(copy)[selected]} />
      <Button method={likeAnecdote} text="Like it"/>
      <h1>Anecdote with the largest vote</h1>
      <Anecdote anecdote={LargestAnectode} />
    </div>
  );
}

export default App;
