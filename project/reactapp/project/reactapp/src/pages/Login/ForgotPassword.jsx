import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../API and Contxt/Context/ToastContext";
import ErrorHandling from "../../Components/Errors/ErrorHandling";

const ForgotPassword = () => {
  // 
  const {showToast,toastMessage,toastType,setToastMessage,setToastType} =useToast();
  // 
  const [email,setEmail] = useState('')
  const [loading, setLoading] = useState(false);
  const [error,setError] =useState('')
  // const [clicked,setClicked] =useState(false)
  const navigate = useNavigate()
  // 
  const handlesubmit = async (e)=>{
      e.preventDefault();
    //  setClicked(true)
      try {
        setLoading(true)
        // clear error state when mounted
        setError('')
        const response = await axios.post('/api/password-reset/',{
          email
        },{headers:{
            'Content-Type': 'application/json',
          }})
          // if response is ok
          if(response.status ===200){
          // notification on success
          setLoading(false)
          // if(clicked){
            showToast('Details on password has been sent to your email', "success"); 
            // navigate('/confirmpassword')
            console.log(response)
          }

      } catch (err) {
        setLoading(false)
        // On first click, error is empty, soluttion:use error directly in showtoast
        // setError(err.response.data?.email|| 'Request failed!')
        // showToast(error || 'Something went wrong try again', "error"); 
        // console.log('error',error)
        const errmesg = err.response?.data?.email || 'Request failed'
        setError(errmesg)
        showToast(errmesg,"error")
        console.log(errmesg)
      }
  }

  // const clearError = () => {
  //   setError(null);
  //   setToastMessage("");
  //   setToastType("");
  //   setClicked(false);
  // };

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
            disabled= {loading}
            type="submit"
            className="w-full py-3 tablet:py-4 bg-[#FF9500] text-white text-lg tablet:text-xl font-bold rounded-lg hover:bg-[#e08700] transition duration-300"
          >
             Send Reset Link   {loading ? "..." : null}
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
    {/* {clicked && toastMessage && toastType && (
        <ErrorHandling
          message={toastMessage}
          show={toastMessage !== null}
          type={toastType}
          onClose={clearError}
        />
      )} */}
    </>
  );
};

export default ForgotPassword;
