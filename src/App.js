import logo from './assets/logo_notext.png';
import './App.scss';
import "primereact/resources/primereact.min.css"; 
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";
import 'primeflex/primeflex.css';  
import Home from './components/home/home'; 
import Chat from './components/chat/chat';
import Login from './components/login/login'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Home></Home>
      <Chat></Chat>
      <Login></Login>
    </div>
  );
}

export default App;
