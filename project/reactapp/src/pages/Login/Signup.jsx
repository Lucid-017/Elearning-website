import '../css/Login.css'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Signup = () => {
  const topCountries = [
    'United States',
    'China',
    'India',
    'Japan',
    'Germany',
    'United Kingdom',
    'France',
    'Brazil',
    'Canada',
    'Russia',
    'Australia',
    'Italy',
    'Nigeria',
    'South Korea',
    'Mexico',
    'Indonesia',
    'Saudi Arabia',
    'Turkey',
    'Netherlands',
    'Switzerland',
    'Spain'
  ];

    // const [countries, setCountries] = useState(["nigeria", "Japan", "Mexico"]);
    // useEffect(()=>{
    //   console.log(countries)
    // },[])
  return (
    <div className='px-5 phone:px-10' >
          <div className="grid tablet:grid-cols-2">
            <div className="div1 mb-40 tablet:mb-0 grid phone:place-items-center h-full w-full phone:px-10 ">
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
                <form method="post">
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      className="block border border-gray-200 rounded-md px-4 "
                      type="email"
                      name="email"
                      required
                      placeholder="Enter your Email"
                    />
                  </div>

                  <div>
                    <label htmlFor="fName">First Name</label>
                    <input
                      className="block border border-gray-200 rounded-md px-4 py-2"
                      placeholder="Enter First Name"
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
                      name="mobile"
                      required
                      placeholder="Enter Mobile Number"
                    />
                  </div>

                  <div>
                    <label htmlFor="country">Country</label>
                    <select  
                      className="block w-full border border-gray-200 rounded-md px-4 py-2"
                      name='country'>
                      {/* loop through sample countries */}
                      <option value="">-- Select a country --</option>
                      {topCountries.map((country, index) => (
                        <option key={index} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="password1">Password</label>
                    <input
                      className="block border border-gray-200 rounded-md px-4 py-2"
                      type="password"
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
                    <button className="btn w-full py-5 bg-[#FF9500] rounded-lg text-white font-bold">
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