import './css/Login.css'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Signup = () => {

    const [countries, setCountries] = useState(["nigeria", "Japan", "Mexico"]);

  return (
    <div className='p-5 phone:p-10 phone:py-10 tablet:py-15 laptop:py-10' >
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
                <h1 className="mb-2 overflow-hidden">Sign Up</h1>
                <p>Create an account to unlock executive features</p>
              </div>
              <div className=" ">
                <form method="post">
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      className="block border border-gray-200 rounded-md px-4 focus:ring-blue-500"
                      type="text"
                      name="email"
                      required
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      className="block border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your email"
                      type="text"
                      name="email"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="mobile">Phone number</label>
                    <input
                      className="block border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="number"
                      name="mobile"
                      required
                      placeholder="Enter your mobile number"
                    />
                  </div>

                  <div>
                    <label htmlFor="country">Country</label>
                    <input
                      className="block border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your country"
                      list="countries"
                      name="country"
                    />
                    <datalist id="countries">
                      {/* loop through sample countries */}
                      {countries.map((country, index) => {
                        <option key={index} value={country}></option>;
                      })}
                    </datalist>
                  </div>

                  <div>
                    <label htmlFor="password1">Password</label>
                    <input
                      className="block border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="password"
                      name="password1"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="password2">Confirm Password</label>
                    <input
                      className="block border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      name="password2"
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
                      Already have an account? <Link to={'/login'}><a>Login</a></Link>
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