// import css
import { useState } from "react";
import "./css/Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [countries, setCountries] = useState(["nigeria", "Japan", "Mexico"]);
  return (
    <>
      <div className="p-10 phone:py-10 tablet:py-15 laptop:py-10">
        {/* if user already exist */}

          <div>
            <div className="grid tablet:grid-cols-2">
              <div className="div1 mb-40 tablet:mb-0 grid phone:place-items-center h-full w-full px-10 ">
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
              <div className="div2 ">
                <div className="text-center mb-10">
                  <h1 className="mb-2 overflow-hidden">Login</h1>
                  <p>Welcome back! please log in to access your account</p>
                </div>
                <div className="">
                  <form method="post">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      name="username"
                      placeholder="Enter your username/email"
                      required
                    />

                    <label htmlFor="password">Password</label>
                    <input
                      type="text"
                      name="password"
                      placeholder="Enter your password"
                      required
                    />
                    <Link to={'/forgotpassword'}>
                      <small>Forgot password?</small>
                    </Link>

                    <div className="btns text-center">
                      <div class="flex items-center mb-4">
                        <input
                          type="checkbox"
                          id="remember"
                          class=" check form-checkbox text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label class="ml-2 text-gray-700" for="remember">
                          Remember Me
                        </label>
                      </div>
                      <button className="btn w-full mb-5 py-5 bg-[#FF9500] rounded-lg text-white font-bold">
                        Login
                      </button>
                      {/* SIGN UP */}
                      <button className="btn w-full py-5 bg-[#F7F7F8] rounded-lg font-[600]">
                        Login with Google
                      </button>
                      {/* <button>Login with Google</button> */}
                      <Link to={'/register'}>
                      <small>
                        Don't have an account? <a>Sign Up</a>
                      </small>
                      </Link>
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
