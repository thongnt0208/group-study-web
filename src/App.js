import logo from "./assets/logo_notext.png";
import "./App.scss";
import ProfilePage from "./components/profile/profile";
import InvitationPage from "./components/group-invite/group-invitation";
import EditProfilePage from "./components/profile/edit-profile";
import GroupDetail from "./components/group-detail/group-detail";

import "primereact/resources/primereact.min.css"; 
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";
import 'primeflex/primeflex.css';  
import Home from './components/home/home'; 
import Chat from './components/chat/chat';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
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
      </header> */}
      <BrowserRouter>
          <h1>Welcome to Group Study Project</h1>
        <nav>
          <ul>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/invitation">Invitation</Link>
            </li>
            <li>
              <Link to="/group-detail">Group Detail</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route exact path="/profile" element={<ProfilePage/>} />
          <Route path="/invitation" element={<InvitationPage/>} />
          <Route path="/edit-profile" element={<EditProfilePage/>} />
          <Route path="/group-detail" element={<GroupDetail/>}/>
        </Routes>
    </BrowserRouter>
      {/* <Home></Home>
      <Chat></Chat> */}
    </div>
  );
};

export default App;
