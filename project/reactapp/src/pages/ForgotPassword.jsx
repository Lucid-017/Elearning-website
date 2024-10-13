import React from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-700">
              Forgot Password
            </h2>
            <p className="text-gray-500">
              Enter your email to reset your password
            </p>
          </div>
          <form method="post" className="w-full">
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                className="block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <button className="w-full bg-[#FF9500] text-white font-semibold py-3 rounded-md hover:bg-orange-500 transition duration-300 ease-in-out">
              Send Reset Link
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">
              Remember your password?{" "}
              <Link to={'/login'} className="text-blue-500">
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
