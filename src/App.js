import logo from "./assets/logo_notext.png";
import "./App.scss";
import ProfilePage from "./screens/ProfileScreen";
import InvitationPage from "./screens/InvitationScreen";
import EditProfilePage from "./screens/EditProfileScreen";

import { Route, BrowserRouter, Routes, Link } from "react-router-dom";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

const App = () => {
  return (
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
          </ul>
        </nav>
        <Routes>
          <Route exact path="/profile" element={<ProfilePage/>} />
          <Route path="/invitation" element={<InvitationPage/>} />
          <Route path="/edit-profile" element={<EditProfilePage/>} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;
