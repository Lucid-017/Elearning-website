import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "./context/ToastContext";

const ForgotPassword = () => {
  // 
  const {showToast} =useToast();
  // 
  const [email,setEmail] = useState('')
  const [error,setError] =useState(null)
  const navigate = useNavigate()
  // 
  const handlesubmit = async (e)=>{
      e.preventDefault();
      try {
        const response = await axios.post('/api/password-reset/',{
          email
        },{headers:{
            'Content-Type': 'application/json',
          }})
          // if response is ok
          // authlogin(userInfo)
        // notification on success
        showToast("Details on password has been sent to your email", "success"); 
          // navigate('/confirmpassword')
          console.log(response)

      } catch (err) {
        setError(err.email|| 'Request failed!')
        console.log('error',error)
        showToast(error, "error"); 

      }
  }
  return (
    <>
<div className="flex justify-center items-center min-h-full bg-gray-50">
      <div className="bg-white p-6 tablet:p-10 rounded-lg shadow-lg w-full max-w-lg tablet:max-w-xl laptop:max-w-2xl">
        <h2 className="text-2xl tablet:text-3xl font-bold pb-5 text-center">
          Forgot Password
        </h2>
        <p className="mb-8 text-center">
        Enter your email to reset your password
        </p>

        <form onSubmit={handlesubmit}>
          <div className="mb-5">
            <label htmlFor="email" className="block text-lg tablet:text-xl font-semibold mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e=>setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 text-lg tablet:text-xl border border-gray-300 rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 tablet:py-4 bg-[#FF9500] text-white text-lg tablet:text-xl font-bold rounded-lg hover:bg-[#e08700] transition duration-300"
          >
             Send Reset Link            
          </button>
        </form>
        <div className="text-center mt-4">
            <p className="text-sm text-gray-500">
              Remember your password?{" "}
              <Link to={'/login'} className="text-blue-500 link">
                Login
              </Link>
            </p>
          </div>
      </div>
    </div>
    </>
  );
};

export default ForgotPassword;
