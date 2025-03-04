// import css
import { useContext, useEffect, useState } from "react";
import "../css/Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../API and Contxt/Context/ToastContext";
import ErrorHandling from "../../Components/Errors/ErrorHandling";
import {GoogleOAuthProvider,GoogleLogin,googleLogout} from "@react-oauth/google";
import { AuthContext } from "../../API and Contxt/Context/AuthContext";
import login from '../../assets/Login.svg'

const Login = () => {
  //
  const { showToast } = useToast();
  // set states for input field
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clIcked, setClicked] = useState(false);
  // error
  const [errormsg, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const {authlogin}=useContext(AuthContext)
  const navigate = useNavigate();

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setClicked(true);

    const data = {
      username: username,
      password: password,
    };

    try {
      setLoading(true);
      // input backend API endpoint
      const response = await axios.post("/api/sign-in/", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);

      // handle successful login: saving the access and refresh token to sessionStorage  and then navigate to dashboard
      // Extracting the tokens and username from the response
      const { access_token, refresh_token } = response.data;
      
      // Saving the userTokens object to sessionStorage  as a string
      const userInfo = sessionStorage.setItem("user_info", JSON.stringify({
        access_token: access_token,
        refresh_token: refresh_token,
        username: username
        }));

      console.log("Sign-in successful, tokens saved:", username);
      // navigate to dahboard on successful login
      setLoading(false);
      if (response?.status === 200) {
        // store user info as global variable
        authlogin(userInfo)
        // notification on success
        showToast("Login Successful", "success"); //global popup for success
        setTimeout(() => {
          navigate("/dashboard");
        }, 500);
      }

      // remember me,store email in local storage
      if (rememberMe) {
        sessionStorage.setItem("username", username);
      } else {
        // remove email if not remembering
        sessionStorage.removeItem("username");
      }
    } catch (err) {
      const errmesg = err.response?.data || { error: "login failed!" };
        // notification on error
      showToast(errmesg.error || "Something went wrong", "error"); //global popup for error
      setLoading(false);
      console.log("error ", err);
    }
  };

  const handleLoginSuccess = async (response) => {
    const { credential } = response; // This contains the Google ID token
    try {
      const res = await axios.post(
        "/api/google-login/",
        { token: credential },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { access_token, refresh_token, username } = res.data;

      // if thus user has already registered
      if (res.data.user_exists) {
        // Store tokens in sessionStorage 
              // Saving the userTokens object to sessionStorage  as a string
      const userInfo = sessionStorage.setItem("user_info", JSON.stringify({
        access_token: access_token,
        refresh_token: refresh_token,
        username: username
        }));
          // store global variable
          authlogin(userInfo)
        // Navigate to the dashboard
        showToast("Login Successful", "success");
        navigate("/dashboard");
      }
      // if the user does not exists,redirect the user to the complete google registeration page
      else {
        // Passing along the prefilled Google info (email, first_name, last_name)in url to be navigated to
        navigate(
          `/register/complete-google-registration?email=${res.data.email}&first_name=${res.data.first_name}&last_name=${res.data.last_name}`
        );
      }
    } catch (error) {
      showToast("Google Login Failed", "error");
      console.error("Google login error: ", error);
    }
  };

  // handle Google login error
  const handleLoginError = () => {
    console.log("Google Login Failed", "error");
  };

  const clearError = () => {
    setError(null);
    setToastMessage("");
    setToastType("");
    setClicked(false);
  };

  // Check local storage for remembered email on load up

  useEffect(() => {
    setError(null);
    const rememberedEmail = sessionStorage.getItem("email");
    if (rememberedEmail) {
      // if remembered email exist
      setUsername(rememberedEmail);
      setRememberMe(true); //thiss also checks the remember me box
    }
  }, []);

  return (
    <>
      <div className="px-5 phone:px-10 my-10">
        {/* if user already exist */}
        <div>
          <div className="grid tablet:grid-cols-2 phone:place-items-center">
            <div className="div1 mb-40 hidden place-content-center tablet:block tablet:mb-0 h-full w-full px-10 ">
              {/* display by the left */}
              <div>
                <h2 className="pb-2">Welcome to Ebemas online learning platform</h2>
                <img src={login} alt="welcome logo" />
              </div>
            </div>
            <div className="div2">
              <div className="text-center mb-10">
                <h1 className="pb-5">Login</h1>
                <p>Welcome back! please log in to access your account</p>
              </div>
              <div className="">
                <form onSubmit={handleSubmit}>
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username/email"
                    required
                  />

                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <Link to={"/forgotpassword"} className="link">
                    <small>Forgot password?</small>
                  </Link>

                  <div className="btns text-center">
                    <div className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        id="remember"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className=" check form-checkbox text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label className="ml-2 text-gray-700" htmlFor="remember">
                        Remember Me
                      </label>
                    </div>
                    <div className="btns w-full">
                    <button
                      disabled={loading}
                      type="submit"
                      className="btn w-full mb-5 py-5 bg-[#FF9500] rounded-lg text-white font-bold"
                    >
                      Login {loading ? "..." : null}
                    </button>
                    <div className="google">
                      <GoogleOAuthProvider  clientId="285601537552-ibees7qsgb5hjkr2a1r9qb3jjk14gvu2.apps.googleusercontent.com">
                        <div className="w-full">
                          <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
          render={(renderProps) => (
            <button
              className="w-full"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
             
            </button>
          )}
        />
                        </div>
                        
                      </GoogleOAuthProvider>
                    </div>

                    </div>

                    <p className="pt-2">
                      Don't have an account?{" "}
                      <Link to={"/register"} className="pl-1 link">
                        Sign Up
                      </Link>
                    </p>
                  </div>

                  {/* <label htmlFor="username">Country</label>
                <select name="" id=""></select> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {clIcked && toastMessage && toastType && (
        <ErrorHandling
          message={toastMessage}
          show={toastMessage !== null}
          type={toastType}
          onClose={clearError}
        />
      )}
    </>
  );
};

export default Login;
