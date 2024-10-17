import '../css/Login.css'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import countries from './countries';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

  //  set states for input s
  const [email,setEmail]= useState('')
  const [fName,setFName]= useState('')
  const [lNmae,setLName]= useState('')
  const [dob,setDob]= useState('')
  const [address,setAddress]= useState('')
  const [mobile,setMobile]= useState('')
  const [country,setCountry]= useState('')
  const [password,setPassword]= useState('')
  const [password2,setPassword2]= useState('')
  const [error,setError] = useState(null)
  const navigate = useNavigate()

  // handle asynchronous submit 
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      // post request
      const response = await axios.post('backendurl',{
        email,
        fName,
        lNmae,
        dob,
        address,
        mobile,
        country,
        password,
        password2
      })
      // handle login after signup
      navigate('/dashboard')
    }catch(error){
      setError(error.response?.data?.message || 'Sign up failed')
      console.log('Error: ',error)
    }
    
    // handle google login

  }

  return (
    <div className='px-5 phone:px-10' >
          <div className="grid tablet:grid-cols-2">
            <div className="div1 mb-40 hidden phone:block tablet:mb-0 grid phone:place-items-center h-full w-full phone:px-10 ">
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
                    <label htmlFor="fName">First Name</label>
                    <input 
                      className="block border border-gray-200 rounded-md px-4 py-2"
                      placeholder="Enter First Name"
                      value={fName}
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
                      value={lNmae}
                      onChange={e=>setLName(e.target.value)}
                      type="text"
                      name="lName"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="dob">Date of birth</label>
                    <input 
                      className="block border border-gray-200 rounded-md px-4 py-2"
                      placeholder="Enter your email"
                      value={dob}
                      onChange={e=>setDob(e.target.value)}
                      type="date"
                      name="dob"
                      required
                    />
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
                    <label htmlFor="mobile">Phone number</label>
                    <input 
                      className="block border border-gray-200 rounded-md px-4 py-2"
                      type="number"
                      value={mobile}
                      onChange={e=>setMobile(e.target.value)}
                      name="mobile"
                      required
                      placeholder="Enter Mobile Number"
                    />
                  </div>

                  <div>
                    <label htmlFor="country">Country</label>
                    <select  
                      className="block w-full border border-gray-200 rounded-md px-4 py-2"
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
                      type="text"
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
                    <button className="btn w-full py-5 bg-[#F7F7F8] rounded-lg">
                      Sign up with Google
                    </button>
                    <p className="text-center pt-5">
                      Already have an account? <Link to={'/login'} className='link'>Login</Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
    </div>
  )
}

export default Signup