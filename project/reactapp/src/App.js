import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Navbar from './Components/Layout/Navbar';
import Footer from './Components/Layout/Footer';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <div>
    {/* ROUTER */}
    
    <Router>
      <div>
   {/* NAVBAR START */}
   <Navbar/>
    {/* NAVBAR END */}
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Signup/>}/>
      <Route path='/forgotpassword' element={<ForgotPassword/>}/>
      <Route path='/*' element={<NotFound/>}/>
    </Routes>
      </div>
    </Router>
    {/* ROUTER END */}
    
 
    {/* FOOTER */}
    <Footer/>
    </div>
  );
}

export default App;
