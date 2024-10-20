// import css
import { useEffect, useState } from "react";
import "../css/Login.css";
import { Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useToast } from "./context/ToastContext";
import ErrorHandling from "../../Components/Errors/ErrorHandling";

const Login = () => {
  // 
  const {showToast} = useToast();
  // set states for input field
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [rememberMe,setRememberMe] = useState(false)
  const [loading, setLoading] =useState(false)
  const [clIcked,setClicked] = useState(false)
  // error
  const [errormsg,setError]=useState(null)
  const [toastMessage,setToastMessage]=useState('')
  const [toastType,setToastType]=useState('')

  const navigate = useNavigate()

  // handle form submit
  const handleSubmit= async (e)=>{
    e.preventDefault();
    setClicked(true)

    const data = {
      username: username,
      password: password,
    };

    try{
      setLoading(true)
      // input backend API endpoint
      const response = await axios.post('/api/sign-in/',data, {
        headers: {
          'Content-Type': 'application/json',
        }
      })

      console.log(response)


      // handle successful login: saving the access and refresh token to localstorage and then navigate to dashboard
      // Extracting the tokens and username from the response
      const { access_token, refresh_token, username } = response.data;

      // Creating an object with username as the key and the tokens as the valuea
      const tokens = {
        access_token: access_token,
        refresh_token: refresh_token,
      };

      // Saving the userTokens object to localStorage as a string
      localStorage.setItem(username, JSON.stringify(tokens));

      console.log('Sign-in successful, tokens saved:', username);
      // navigate to dahboard on successful login
      setLoading(false)
      if(response?.status === 200){
        showToast('Login Successful', 'success')  //global popup for success
        setTimeout(() => {
          navigate('/dashboard')
        }, 500);
      }


      // remember me,store email in local storage
      if(rememberMe){
        localStorage.setItem('username',username)
      }else{
        // remove email if not remembering
        localStorage.removeItem('username')
      }
    }catch(err){
      const errmesg = err.response?.data ||  {error:'login failed!'};
      showToast(errmesg.error || 'Something went wrong', 'error') //global popup for error
      setLoading(false);
      console.log('error ',err)

    }
  }

  // handle login with google
  // const handleGoogleLogin = async (response)=>{
  //   const {credentials} = response //gets the id token from the response
  //   try{
  //     const res = await axios.post('backendgooglelogin',{
  //       idToken: credentials,
  //     })
  //     console.log('google login success', res.data)
  //     // 
  //     if(res.ok){
  //       navigate('/dashboard')
  //     }
  //   }catch(error){
  //     setError(error.response?.data?.message || 'Google Login failed')
  //     console.log("Error: ---", error.response)
  //   }
  // }

  const handleLoginSuccess = async (response) => {
    const { credential } = response; // This contains the Google ID token
    try {
      const res = await axios.post('/api/google-login/', { token: credential }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const { access_token, refresh_token, username } = res.data;

      // if thus user has already registered
      if (res.data.user_exists) {
        // Store tokens in localStorage
        localStorage.setItem(username, JSON.stringify({
          access_token: access_token,
          refresh_token: refresh_token,
        }));
  
        // Navigate to the dashboard
        showToast('Login Successful', 'success');
        navigate('/dashboard');

      } 
      // if the user does not exists,redirect the user to the complete google registeration page
      else {
        // Passing along the prefilled Google info (email, first_name, last_name)in url to be navigated to
        navigate(`/register/complete-google-registration?email=${res.data.email}&first_name=${res.data.first_name}&last_name=${res.data.last_name}`)
      }

    } catch (error) {
      showToast('Google Login Failed', 'error');
      console.error("Google login error: ", error);
    }
  };

    // handle Google login error
    const handleLoginError = () => {
      console.log('Google Login Failed', 'error');
    };
  


  const clearError= ()=>{
    setError(null)
    setToastMessage('')
    setToastType('')
    setClicked(false)
  }

  // Check local storage for remembered email on load up

  useEffect(()=>{
    setError(null)
    const rememberedEmail = localStorage.getItem('email')
      if(rememberedEmail){
          // if remembered email exist
          setUsername(rememberedEmail);
          setRememberMe(true) //thiss also checks the remember me box
      }
  },[])

  useEffect(()=>{
    if(toastMessage && toastType)
   console.log('updated toast message', toastMessage)
   console.log('updated toast type', toastType)
  },[toastMessage,toastType])
  return (
    <>
      <div className="px-5 phone:px-10">
        {/* if user already exist */}
          <div>
            <div className="grid tablet:grid-cols-2">
              <div className="div1 mb-40 hidden phone:block tablet:mb-0 grid phone:place-items-center h-full w-full px-10 ">
                {/* display by the left */}
                <div>
                  <h2 className="pb-2">Students Testimonials</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Tempus tincidunt
                    etiam eget elit id imperdiet et. Cras eu sit dignissim lorem
                    nibh et. Lorem ipsum dolor sit amet consectetur. Tempus
                    tincidunt etiam eget elit id imperdiet et. Cras eu sit
                    dignissim lorem nibh et.Lorem ipsum dolor sit amet
                    consectetur. Tempus tincidunt etiam eget elit id imperdiet
                    et. Cras eu sit dignissim lorem nibh et.Lorem ipsum dolor
                    sit amet consectetur. Tempus tincidunt etiam eget elit id
                    imperdiet et. Cras eu sit dignissim lorem nibh et.Ac cum
                    eget habitasse in velit fringilla feugiat senectus in.
                  </p>

                  <div className="carosel laptop:pl-10 pt-20">
                    The web design course provided a solid foundation for me.
                    The instructors were knowledgeable and supportive, and the
                    interactive learning environment was engaging. I highly
                    recommend it!
                  </div>
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
                      onChange={e=>setUsername(e.target.value)}
                      placeholder="Enter your username/email"
                      required
                    />

                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={e=>setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                    <Link to={'/forgotpassword'} className="link">
                      <small>Forgot password?</small>
                    </Link>

                    <div className="btns text-center">
                      <div className="flex items-center mb-4">
                        <input
                          type="checkbox"
                          id="remember"
                          checked={rememberMe}
                          onChange={e=>setRememberMe(e.target.checked)}
                          className=" check form-checkbox text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label className="ml-2 text-gray-700" htmlFor="remember">
                          Remember Me
                        </label>
                      </div>
                      <button disabled={loading} type="submit" className="btn w-full mb-5 py-5 bg-[#FF9500] rounded-lg text-white font-bold">
                        Login {loading ? '...':null}
                      </button>
                      <GoogleOAuthProvider clientId="285601537552-ibees7qsgb5hjkr2a1r9qb3jjk14gvu2.apps.googleusercontent.com">
                      <GoogleLogin
                            onSuccess={handleLoginSuccess}
                            onError={handleLoginError}
                        />
                      </GoogleOAuthProvider>
                      <p>
                      Don't have an account?                       <Link to={'/register'} className="pl-1 link">
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
       <ErrorHandling message={toastMessage} show={toastMessage !==null} type={toastType} onClose={clearError}/>
      )}
    </>
  );
};

export default Login;
