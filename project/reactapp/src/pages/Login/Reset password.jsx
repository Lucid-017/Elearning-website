import '../css/resetPassword.css'

const ResetPassword = () => {
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

        <form>
          <div className="mb-5">
            <label htmlFor="newPassword" className="block text-lg tablet:text-xl font-semibold mb-2">
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
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