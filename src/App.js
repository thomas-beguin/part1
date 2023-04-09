import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div>
      <p>Hello</p>
      <Test name="toto"/>
    </div>
  );
}

function Test(props) {
  return (
    <div>
      <p>{props.name}</p>
    </div>
  )
}
export default App;
