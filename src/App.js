import logo from './logo.svg';
import './App.css';
import SetTestString from './components/SetTestString';
import ShowResults from './components/ShowResults';

function App() {
  return (
    <div id= "app" className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
      </header>
      <SetTestString />
      <hr />
      < ShowResults/>
    </div>
  );
}

export default App;
