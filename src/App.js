import logo from './logo.svg';
import './App.css';
import './buttonStyles.css';
import './materialStyles.css';
import SetTestString from './components/SetTestString';
import PredictNextString from './components/PredictNextString';

function App() {
  return (
    <div id= "app" className="App">
      <header className="App-header">
      </header>
      <SetTestString />
      <hr />
      <PredictNextString />
    </div>
  );
}

export default App;
