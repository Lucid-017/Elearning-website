// import css
import { useState } from "react";
import "./css/Login.css";

const Login = () => {
  const [login, setLogin] = useState(true);
  const [countries, setCountries] = useState(["nigeria", "Japan", "Mexico"]);
  return (
    <div className="py-10">
      {/* if user already exist */}
      {login ? (
        <div>
          <div className="grid grid-cols-2">
          <div className="div1 grid place-items-center h-full w-full px-20 ">
            {/* display by the left */}
            <div>
            <h2 className="pb-2">Students Testimonials</h2>
            <p>Lorem ipsum dolor sit amet consectetur. 
              Tempus tincidunt etiam eget elit id 
              imperdiet et. Cras eu sit dignissim 
              lorem nibh et. Lorem ipsum dolor sit amet consectetur. 
              Tempus tincidunt etiam eget elit id 
              imperdiet et. Cras eu sit dignissim 
              lorem nibh et.Lorem ipsum dolor sit amet consectetur. 
              Tempus tincidunt etiam eget elit id 
              imperdiet et. Cras eu sit dignissim 
              lorem nibh et.Lorem ipsum dolor sit amet consectetur. 
              Tempus tincidunt etiam eget elit id 
              imperdiet et. Cras eu sit dignissim 
              lorem nibh et.Ac cum eget habitasse in velit fringilla feugiat senectus in.</p>
            
            <div className="carosel pl-10 pt-20">
            The web design course provided a solid foundation for me. The instructors were knowledgeable and supportive, and the interactive learning environment was engaging. I highly recommend it!
            </div>
            </div>
        
          </div>            <div className="div2 ">
              <div className="text-center mb-10">
                <h1 className="mb-2">Login</h1>
                <p>Welcome back! please log in to access your account</p>
              </div>
              <div className="flex justify-center">
                <form method="post">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    name="email"
                    placeholder="Enter your email"
                    required
                  />

                  <label htmlFor="password">Password</label>
                  <input
                    type="text"
                    name="password"
                    placeholder="Enter your password"
                    required
                  />
                  <small>Forgot password?</small>

                  

                  <div className="btn text-center">
                  <div class="flex items-center mb-4">
            <input
                type="checkbox"
                id="remember"
                class=" check form-checkbox text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label class="ml-2 text-gray-700" for="remember">Remember Me</label>
        </div>
                    <button className="btn w-full mb-5 py-5 bg-[#FF9500] rounded-lg text-white font-bold">Login</button>
                    {/* SIGN UP */}
                  <button className="btn w-full py-5 bg-[#F7F7F8] rounded-lg font-[600]">Login with Google</button>
                  {/* <button>Login with Google</button> */}
                  <small>
                    Don't have an account? <a>Sign Up</a>
                  </small>
                  </div>
                  
                  {/* <label htmlFor="username">Country</label>
                <select name="" id=""></select> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2">
          <div className="div1 grid place-items-center h-full w-full px-20 ">
            {/* display by the left */}
            <div>
            <h2 className="pb-2">Students Testimonials</h2>
            <p>Lorem ipsum dolor sit amet consectetur. 
              Tempus tincidunt etiam eget elit id 
              imperdiet et. Cras eu sit dignissim 
              lorem nibh et. Lorem ipsum dolor sit amet consectetur. 
              Tempus tincidunt etiam eget elit id 
              imperdiet et. Cras eu sit dignissim 
              lorem nibh et.Lorem ipsum dolor sit amet consectetur. 
              Tempus tincidunt etiam eget elit id 
              imperdiet et. Cras eu sit dignissim 
              lorem nibh et.Lorem ipsum dolor sit amet consectetur. 
              Tempus tincidunt etiam eget elit id 
              imperdiet et. Cras eu sit dignissim 
              lorem nibh et.Ac cum eget habitasse in velit fringilla feugiat senectus in.</p>
            
            <div className="carosel pl-10 pt-20">
            The web design course provided a solid foundation for me. The instructors were knowledgeable and supportive, and the interactive learning environment was engaging. I highly recommend it!
            </div>
            </div>
        
          </div>
          <div className="div2">
            <div className="text-center mb-10">
              <h1 className="mb-2">Sign Up</h1>
              <p>Create an account to unlock executive features</p>
            </div>
            <div className="flex justify-center">
              <form method="post">
                <div>
                  <label htmlFor="fullname">Full name</label>
                  <input
                    className="block border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    name="fullname"
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
                  <datalist id="contries">
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
                  </button>
                  <br />
                  <p className="my-2 text-center">OR</p>
                  <button className="btn w-full py-5 bg-[#F7F7F8] rounded-lg">
                    Sign up with Google
                  </button>
                  <p className="text-center">
                    Already have an account? <a>Login</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
