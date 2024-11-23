import {
  BrowserRouter as Router,
  Route,
  Routes,
  replace,
} from "react-router-dom";
import { Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound";
import Navbar from "./Components/Layout/Navbar";
import Footer from "./Components/Layout/Footer";
import Signup from "./pages/Login/Signup";
import ForgotPassword from "./pages/Login/ForgotPassword";
import Contact from "./pages/Contact";
import ResetPassword from "./pages/Login/Reset password";
import Dashboard from "../src/pages/Dashboard/Dashboard";
import CompleteGoogleRegistration from "./pages/Login/complete-google-registeration";
import YearLevels from "./pages/Courses/YearLevels";
// import QuizList from './pages/QuizList';
// import QuizDetail from './pages/QuizDetail';
import { ToastProvider } from "./API and Contxt/Context/ToastContext";
import { AuthProvider, useAuth } from "./API and Contxt/Context/AuthContext";
import Learning from "./pages/Courses/Learning";
import { useEffect, useState } from "react";
import ProtectedRoute from "./Route";
import Grade from "./pages/Courses/Grade";
import { CoursesProvider } from "./API and Contxt/Context/Courses";
import Topics from "./pages/Courses/Topics";

function App() {
  // confirm if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  // runs when application loads
  useEffect(() => {
    const userInfoString = sessionStorage.getItem("user_info");
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      setToken(userInfo);
      setIsLoggedIn(true);
      console.log("user is logged in");
    } else {
      console.log("user is not logged in");
      // setUser(null)
      setIsLoggedIn(false);
      setToken(null);
    }
  }, []); //anytime user logs out and logs in

  return (
    <CoursesProvider>
      <AuthProvider>
        <ToastProvider>
          <div>
            {/* ROUTER */}

            <Router>
              <div>
                {/* NAVBAR START */}
                <Navbar />
                {/* NAVBAR END */}
                <Routes>
                  {/* redirect '/' to dashboard if logged in */}
                  <Route
                    path="/"
                    element={
                      isLoggedIn ? <Navigate to="/dashboard" /> : <Home />
                    }
                  />
                  <Route path="/about" element={<About />} />
                  <Route path="/login" element={<Login />} />
                  {/* Routes that require Auth */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="learning"
                    element={<Navigate to="learning/:subject" replace />}
                  />
                  <Route
                    path="learning/:subject"
                    element={
                      <ProtectedRoute>
                        <Learning />
                      </ProtectedRoute>
                    }
                  > 
                    {/* Nested routes inside Learning */}
                    <Route index element={<YearLevels />} />
                    <Route path=":grade" element={<Grade />} />
                    \ <Route path="topic" element={<Topics />} />
                  </Route>
                  {/* Routes that require Auth */}
                  {/* <Route path="learning/:subject/:grade" element={<ProtectedRoute><Grade/></ProtectedRoute>}/> */}

                  <Route path="/register" element={<Signup />} />
                  <Route
                    path="/register/complete-google-registration"
                    element={<CompleteGoogleRegistration />}
                  />
                  <Route path="/forgotpassword" element={<ForgotPassword />} />
                  <Route
                    path="/confirm-password-reset/:uidb64/:token"
                    element={<ResetPassword />}
                  />
                  <Route path="/contact" element={<Contact />} />
                  {/* <Route path='/maths' element={<QuizList/>}/> */}
                  {/* <Route path='/maths/quiz/:quizId' element={<QuizDetail/>}/> */}
                  <Route path="/*" element={<NotFound />} />
                </Routes>
              </div>
            </Router>
            {/* ROUTER END */}

            {/* FOOTER */}
            <Footer />
          </div>
        </ToastProvider>
      </AuthProvider>
    </CoursesProvider>
  );
}

export default App;
