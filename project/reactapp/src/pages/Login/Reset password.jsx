import axios from 'axios'
import '../css/resetPassword.css'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

const ResetPassword = () => {
  const [new_password,setPassword] =useState('')
  const [confirm_password,setConfirmPassword] =useState('')
  const [error,setError] =useState(null)

  // let uidb64 = match.params.uid
  // let token = match.params.token 
  let {uidb64,token} =useParams()

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try {
      const data ={
        new_password,
        confirm_password
      }
      const res = await axios.post(`/api/password-reset-confirm/${uidb64}/${token}/`,data,{
        headers:{
          'Content-Type':'application/json'
        }
      })
      console.log('password reset complete')
    } catch (error) {
      setError(error)
      console.log(error)
    }
  }
  return (
    <>
    <div className="flex justify-center items-center min-h-full bg-gray-50">
      <div className="bg-white p-6 tablet:p-10 rounded-lg shadow-lg w-full max-w-lg tablet:max-w-xl laptop:max-w-2xl">
        <h2 className="text-2xl tablet:text-3xl font-bold pb-5 text-center">
          Reset Your Password
        </h2>
        <p className="mb-8 text-center">
          Enter a new password below to reset your account.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="newPassword" className="block text-lg tablet:text-xl font-semibold mb-2">
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              value={new_password}
              onChange={e=>setPassword(e.target.value)}
              placeholder="Enter new password"
              className="input-field"
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="confirmPassword" className="block text-lg tablet:text-xl font-semibold mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirm_password}
              onChange={e=>setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="input-field"
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
    </>
  )
}

export default ResetPassword;