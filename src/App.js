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
import { Route, BrowserRouter, Routes, Link } from "react-router-dom";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import Register from './components/register/register';
import Login from './components/login/login'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/hone" element={<Home />} />
          <Route exact path="/profile" element={<ProfilePage />} />
          <Route path="/invitation" element={<InvitationPage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route path="/group-detail" element={<GroupDetail />} />
        </Routes>
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
      </BrowserRouter>
      {/* <Home></Home>
      <Chat></Chat> */}
    </div>
  );
};

export default App;
