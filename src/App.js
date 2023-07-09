import logo from './assets/logo_notext.png';
import './App.scss';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeflex/primeflex.css';
import ProfilePage from './components/profile/profile';
import InvitationPage from './components/group-invite/group-invitation';
import EditProfilePage from './components/profile/edit-profile';
import GroupDetail from './components/group-detail/group-detail';
import NotFound from './pages/NotFound';
import Groups from './pages/Groups';
import { isExpired, decodeToken } from "react-jwt";

import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import Home from './components/home/home';
import Chat from './components/chat/chat';
import { Route, BrowserRouter, Routes, Link } from 'react-router-dom';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import Register from './components/register/register';
import Login from './components/login/login';
import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import Header from './components/shared/header/header';
import Footer from './components/shared/footer/footer';

function App() {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   // Callback function to update isLoggedIn state
   const handleLogin = () => {
      setIsLoggedIn(true);
   };
   const handleLogout = () => {
      setIsLoggedIn(false);
      localStorage.removeItem('token');
      window.location.href = '/';
   };

   const handleToken = () => {
      let token = localStorage.getItem('token');
      if (token != null) {
         // Decode JWT token
         console.log(token.replace('Bearer ', ''));
         decodeToken(token.replace('Bearer ', ''));
         if (isExpired === true) { setIsLoggedIn(false) } else {
            setTimeout(() => {
               setIsLoggedIn(true)
            }, 3000);
         };
      } else {
         setIsLoggedIn(false);
      }

   }

   useEffect(() => {
      handleToken()

   }, [isLoggedIn])


   return (
      <div className='App'>
         <BrowserRouter>
            <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            <Routes>
               <Route path='/' element={isLoggedIn === false ? (<Login onLogin={handleLogin} />) : (<Home />)} />
               <Route path='/register' element={<Register />} />
               <Route path='/home' element={<Home />} />
               <Route exact path='/profile' element={<ProfilePage />} />
               <Route path='/invitation' element={<InvitationPage />} />
               <Route path='/edit-profile' element={<EditProfilePage />} />
               <Route path='/groups' element={<Groups />} />
               <Route path='/group-detail/:groupId' element={<GroupDetail />} />
               <Route path='*' element={<NotFound />} />
            </Routes>
            <Footer />
         </BrowserRouter>
      </div>
   );
}

export default App;
