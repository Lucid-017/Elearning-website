import '../css/Login.css'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import countries from './countries';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useToast } from "../../API and Contxt/Context/ToastContext";
import ErrorHandling from "../../Components/Errors/ErrorHandling";
import { AuthContext, useAuth } from '../../API and Contxt/Context/AuthContext';

const CompleteGoogleRegistration = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const {showToast} = useToast();
    //  set states for inputs

    const [first_name, setFName] = useState(queryParams.get('first_name') || '');
    const [last_name, setLName] = useState(queryParams.get('last_name') || '');
    const [email, setEmail] = useState(queryParams.get('email') || '');
    const [username,setUsername]= useState('')
    const [date_of_birth,setDob]= useState('')
    const [address,setAddress]= useState('')
    const [phone_number,setMobile]= useState('')
    const [gender,setGender]= useState('')
    const [country,setCountry]= useState('')
    const [error,setError] = useState(null)
    const [clIcked,setClicked] = useState(false)
    const [loading, setLoading] =useState(false)
    const [toastMessage,setToastMessage]=useState('')
    const [toastType,setToastType]=useState('')
    const {authlogin}= useContext(AuthContext)

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
      }
      try{
        setLoading(true)
        // post request
        const response = await axios.post('/api/google-login/register/',data,{
          headers:{
            'Content-Type':'application/json'
          }
        })
        console.log('signup was successful', response.data)
        // store and track login token and info
        const { access_token, refresh_token, username } = response.data;
        const userInfo =sessionStorage.setItem("user_info", JSON.stringify({
          access_token: access_token,
          refresh_token: refresh_token,
          username: username
          }));
          // store global variable
          authlogin(userInfo)
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
  
  
                    <p className="text-sm my-5 text-center">
                      I agree with <a href="#">Terms of use</a> and
                      <a href="#"> Privacy Policy</a>
                    </p>
                    <div className="btns">
                      <button 
                      type='submit'
                      className="btn w-full py-5 bg-[#FF9500] rounded-lg text-white font-bold">
                        Complete Registeration
                      </button>
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
  
  export default CompleteGoogleRegistration