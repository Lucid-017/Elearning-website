import '../css/Login.css'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import countries from './countries';
import { useNavigate } from 'react-router-dom';
import { useToast } from "./context/ToastContext";
import ErrorHandling from "../../Components/Errors/ErrorHandling";


const Signup = () => {
  const {showToast} = useToast();
  //  set states for input s
  const [email,setEmail]= useState('')
  const [first_name,setFName]= useState('')
  const [username,setUsername]= useState('')
  const [last_name,setLName]= useState('')
  const [date_of_birth,setDob]= useState('')
  const [address,setAddress]= useState('')
  const [gender,setGender]= useState('')
  const [phone_number,setMobile]= useState('')
  const [country,setCountry]= useState('')
  const [password,setPassword]= useState('')
  const [password2,setPassword2]= useState('')
  const [error,setError] = useState(null)
  const [clIcked,setClicked] = useState(false)
  const [loading, setLoading] =useState(false)
  const [toastMessage,setToastMessage]=useState('')
  const [toastType,setToastType]=useState('')
  // 
  const navigate = useNavigate()

  // handle asynchronous submit 
  const handleSubmit = async(e)=>{
    e.preventDefault();
    setClicked(true)
    const data = {
      email,
      first_name,
      last_name,
      username,
      date_of_birth,
      gender,
      phone_number,
      address,
      country,
      password,
      password2
    }
    try{
      setLoading(true)
      // post request
      const response = await axios.post('/api/register/',data,{
        headers:{
          'Content-Type':'application/json'
        }
      })
      console.log('signup was successful', response.data)

      // storing refresh and access token
      const { access_token, refresh_token, username } = response.data;
        
      localStorage.setItem("user_info", JSON.stringify({
        access_token: access_token,
        refresh_token: refresh_token,
        username: username
        }));

      // handle login after signup
      setLoading(false)
      // if(response?.status === 200){
        showToast('User registered successfully', 'success')  //global popup for success
      // }
      navigate('/dashboard')


    }catch(error){
      console.log('Error: ',error)
      const errData = error.response?.data
      // loop through error array
      let combinederr = ''
      for(let field in errData){
        if(Array.isArray(errData[field])){
 
           combinederr = Object.keys(errData).map((field)=>`${field} : ${errData[field].join('')}\n`)
            showToast(combinederr , 'error' ) //show individual errors

        }
      }
      // showToast(error.response?.data || 'Sign up failed','error')
      setLoading(false)
    }
    
    // handle google login
  }

  const handleLoginSuccess = async (response) => {
    const { credential } = response; // This contains the Google ID token
    try {
      const res = await axios.post('/api/google-login/', { token: credential }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const { access_token, refresh_token, username } = res.data;

      // if this user has already registered
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

  return (
    <div className='px-5 phone:px-10' >
          <div className="grid tablet:grid-cols-2">
            <div className="div1 mb-40 grid phone:place-items-center hidden phone:block tablet:mb-0  h-full w-full phone:px-10 ">
              {/* display by the left */}
              <div>
                <h2 className="pb-2">Students Testimonials</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam
                  eget elit id imperdiet et. Cras eu sit dignissim lorem nibh
                  et. Lorem ipsum dolor sit amet consectetur. Tempus tincidunt
                  etiam eget elit id imperdiet et. Cras eu sit dignissim lorem
                  nibh et.Lorem ipsum dolor sit amet consectetur. Tempus
                  tincidunt etiam eget elit id imperdiet et. Cras eu sit
                  dignissim lorem nibh et.Lorem ipsum dolor sit amet
                  consectetur. Tempus tincidunt etiam eget elit id imperdiet et.
                  Cras eu sit dignissim lorem nibh et.Ac cum eget habitasse in
                  velit fringilla feugiat senectus in.
                </p>

                <div className="carosel laptop:pl-10 pt-20">
                  The web design course provided a solid foundation for me. The
                  instructors were knowledgeable and supportive, and the
                  interactive learning environment was engaging. I highly
                  recommend it!
                </div>
              </div>
            </div>
            {/* RIGHT */}
            <div className="div2">
              <div className="text-center mb-10">
                <h1 className="pb-5 overflow-hidden">Sign Up</h1>
                <p>Create an account to unlock executive features</p>
              </div>
              <div className=" ">
                <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="fName">First Name</label>
                    <input 
                      className="block border border-gray-200 rounded-md px-4 py-2"
                      placeholder="Enter First Name"
                      value={first_name}
                      onChange={e=>setFName(e.target.value)}
                      type="text"
                      name="fName"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lName">Last Name</label>
                    <input 
                      className="block border border-gray-200 rounded-md px-4 py-2"
                      placeholder="Enter Last Name"
                      value={last_name}
                      onChange={e=>setLName(e.target.value)}
                      type="text"
                      name="lName"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="username">Username</label>
                    <input 
                      className="block border border-gray-200 rounded-md px-4 py-2"
                      placeholder="Enter Last Name"
                      value={username}
                      onChange={e=>setUsername(e.target.value)}
                      type="text"
                      name="username"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input  
                      className="block border border-gray-200 rounded-md px-4 "
                      type="email"
                      name="email"
                      value={email}
                      onChange={e=>setEmail(e.target.value)}
                      required
                      placeholder="Enter your Email"
                    />
                  </div>

                  <div>
                    <label htmlFor="mobile">Phone number</label>
                    <input 
                      className="block border border-gray-200 rounded-md px-4 py-2"
                      type="text"
                      value={phone_number}
                      onChange={e=>setMobile(e.target.value)}
                      name="mobile"
                      required
                      placeholder="Enter Mobile Number"
                    />
                  </div>
                  <div>
                    <label htmlFor="dob">Date of birth</label>
                    <input 
                      className="block border border-gray-200 rounded-md px-4 py-2"
                      placeholder="Enter your email"
                      value={date_of_birth}
                      onChange={e=>setDob(e.target.value)}
                      type="date"
                      name="dob"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="gender">Gender</label>
                    <select 
                      className="select block w-full border border-gray-200 rounded-md px-4 py-2"
                      onChange={e=>setGender(e.target.value)}
                    name="gender"
                    value={gender}>
                        <option value="">--Select Gender--</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="address">Address</label>
                    <input 
                      className="block border border-gray-200 rounded-md px-4 py-2"
                      placeholder="Enter Address"
                      value={address}
                      onChange={e=>setAddress(e.target.value)}
                      type="text"
                      name="address"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="country">Country</label>
                    <select  
                      className="select block w-full border border-gray-200 rounded-md px-4 py-2"
                      name='country'
                      required
                      value={country}
                      onChange={e=>setCountry(e.target.value)}>
                      {/* loop through sample countries */}
                      <option value="">-- Select a country --</option>
                      {countries.map((country) => (
                        <option key={country.value} value={country.value}>{country.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="password1">Password</label>
                    <input 
                      className="block border border-gray-200 rounded-md px-4 py-2"
                      type="password"
                      value={password}
                      onChange={e=>setPassword(e.target.value)}
                      name="password1"
                      placeholder='Enter your password'
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="password2">Confirm Password</label>
                    <input 
                      className="block border border-gray-200 rounded-md px-4 py-2"
                      type="password"
                      value={password2}
                      onChange={e=>setPassword2(e.target.value)}
                      name="password2"
                      placeholder='Re-type your password'
                      required
                    />
                  </div>

                  <p className="text-sm my-5 text-center">
                    I agree with <a href="#">Terms of use</a> and
                    <a href="#"> Privacy Policy</a>
                  </p>
                  <div className="btns">
                    <button 
                    type='submit'
                    className="btn w-full py-5 bg-[#FF9500] rounded-lg text-white font-bold">
                      Sign Up
                    </button>                    <p className="my-2 text-center">OR</p>
                    
                    <GoogleOAuthProvider clientId="285601537552-ibees7qsgb5hjkr2a1r9qb3jjk14gvu2.apps.googleusercontent.com">
                      <GoogleLogin
                            onSuccess={handleLoginSuccess}
                            onError={handleLoginError}
                        />
                      </GoogleOAuthProvider>
                    
                    <p className="text-center pt-5">
                      Already have an account? <Link to={'/login'} className='link'>Login</Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        
          {clIcked && toastMessage && toastType && (
       <ErrorHandling  message={toastMessage} show={toastMessage !==null} type={toastType} onClose={clearError}/>
      )}
      {/* {toastMessage ==='error' && toastMessage.map((err,index)=>{
        return <ErrorHandling key={index} message={err} show={toastMessage !==null} type={'error'} onClose={clearError}/>

      })} */}
    </div>
    
  )
}

export default Signup