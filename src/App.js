import logo from "./assets/logo_notext.png";
import "./App.scss";
import ProfilePage from "./screens/ProfileScreen";
import InvitationPage from "./screens/InvitationScreen";
import EditProfilePage from "./screens/EditProfileScreen";

import "primereact/resources/primereact.min.css"; 
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";
import 'primeflex/primeflex.css';  
import Home from './components/home/home'; 
import Chat from './components/chat/chat';

import { Route, BrowserRouter, Routes, Link } from "react-router-dom";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

const App = () => {
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
    </div>
  );
};

export default App;
