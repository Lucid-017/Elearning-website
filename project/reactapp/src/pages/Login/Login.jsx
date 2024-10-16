// import css
import { useEffect, useState } from "react";
import "../css/Login.css";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Login = () => {
  // set states for input field
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [rememberMe,setRememberMe] = useState(false)
  // error
  const [error,setError]=useState(null)
  const navigate = useNavigate()

  // handle form submit
  const handleSubmit= async (e)=>{
    e.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    try{
      // input backend API endpoint
      const response = await axios.post('/api/sign-in/',data, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      console.log('login successful',response.data)

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
      navigate('/dashboard')

      // remember me,store email in local storage
      if(rememberMe){
        localStorage.setItem('username',username)
      }else{
        // remove email if not remembering
        localStorage.removeItem('username')
      }
    }catch(error){
      setError(error.response?.data?.error|| 'login failed!')
      console.log('error',error.response.data)
    }
  }

  // handle login with google
  const handleGoogleLogin = async (response)=>{
    const {credentials} = response //gets the id token from the response
    try{
      const res = await axios.post('backendgooglelogin',{
        idToken: credentials,
      })
      console.log('google login success', res.data)
      // 
      if(res.ok){
        navigate('/dashboard')
      }
    }catch(error){
      setError(error.response?.data?.message || 'Google Login failed')
      console.log("Error: ---", error.response)
    }
  }

  // Check local storage for remembered email on load up
  useEffect(()=>{
    const rememberedEmail = localStorage.getItem('email')
      if(rememberedEmail){
          // if remembered email exist
          setUsername(rememberedEmail);
          setRememberMe(true) //thiss also checks the remember me box
      }
  },[])

  return (
    <>
      <div className="px-5 phone:px-10">
        {error ? (
          <div>{error}</div>
        ):<div> login successful !</div>}
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
                          class=" check form-checkbox text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label className="ml-2 text-gray-700" htmlFor="remember">
                          Remember Me
                        </label>
                      </div>
                      <button type="submit" className="btn w-full mb-5 py-5 bg-[#FF9500] rounded-lg text-white font-bold">
                        Login
                      </button>
                      <button 
                      data-client_id='id.apps.googleusercontent.com'
                      data-login-uri = 'backend google url'
                      data-callback={handleGoogleLogin}
                      onClick={()=>window.google?.accounts.id.prompt()}
                      type="submit"
                       className="btn w-full mb-2 py-5 bg-[#F7F7F8] rounded-lg font-[600]">
                        Login with Google
                      </button>
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
    </>
  );
};

export default Login;
