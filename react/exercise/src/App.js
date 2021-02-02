import './App.css';
import CounterView from './view/counter-view'
import {Container} from 'semantic-ui-react'

function App() {
  return (
    <Container>
      <h1>React Hooks Context Demo</h1>
      <CounterView/>
    </Container>
  );
}

export default App;
