import logo from './assets/logo_notext.png';
import './App.scss';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
// import Home from './components/home/home';
import { Route, BrowserRouter, Routes, Link, Router } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Groups from './pages/Groups';

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path='/groups' element={<Groups />} />
            <Route path='*' element={<NotFound />} />{' '}
         </Routes>
      </BrowserRouter>
   );
}

export default App;
