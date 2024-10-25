import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound';
import Navbar from './Components/Layout/Navbar';
import Footer from './Components/Layout/Footer';
import Signup from './pages/Login/Signup';
import ForgotPassword from './pages/Login/ForgotPassword';
import Contact from './pages/Contact';
import ResetPassword from './pages/Login/Reset password';
import Dashboard from '../src/pages/Dashboard/Dashboard'
import CompleteGoogleRegistration from './pages/Login/complete-google-registeration';
import YearLevels from './pages/YearLevels';
import QuizList from './pages/QuizList';
import QuizDetail from './pages/QuizDetail';
import { ToastProvider } from './pages/Login/context/ToastContext';
import { AuthProvider } from "./Components/Context/AuthContext";

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
      <div>
      {/* ROUTER */}
      
      <Router>
        <div>
    {/* NAVBAR START */}
    <Navbar/>
      {/* NAVBAR END */}
      <Routes>
        <Route path='/' exact element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/register' element={<Signup/>}/>
        <Route path="/register/complete-google-registration" element={<CompleteGoogleRegistration/>}/>
        <Route path='/forgotpassword' element={<ForgotPassword/>}/>
        <Route path='/confirm-password-reset/:uidb64/:token' element={<ResetPassword/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path="/learning/:subject/" element={<YearLevels/>}/>
        <Route path='/maths' element={<QuizList/>}/>
        <Route path='/maths/quiz/:quizId' element={<QuizDetail/>}/>
        <Route path='/*' element={<NotFound/>}/>
      </Routes>
        </div>
      </Router>
      {/* ROUTER END */}
      
  
      {/* FOOTER */}
      <Footer/>
      </div>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
