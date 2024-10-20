import { useState } from "react";
import "../Layout/css/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  //NOTE check if refresh token exist, if it does then use info to render log out for signed in users
  return (
    <>
      <nav className="py-10 px-5 phone:px-10 tablet:px-20 mb-5 tablet:mb-20">
        
  <div className="w-full flex justify-between">
   {/* Logo */}
   <Link to='/' className="text-black no-underline ">
    <h1 className="font-bold overflow-hidden">EBEDMAS</h1>
   </Link>
    {/* Hamburger Icon (Visible on phone screens) */}
    <div className="phone:block tablet:hidden">
      <button onClick={toggleMenu} className="focus:outline-none">
        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>

    {/* Navbar Links (Hidden on phone screens, visible on tablet and above) */}
    <div className="hidden tablet:flex space-x-6">
      <Link to={'/'} className="link">
        Home
      </Link>
      <Link to={'/courses'} className="link">
      Courses
      </Link>
      <Link to={'/pricing'} className="link">
      Pricing
      </Link>
      <Link to={'/about'} className="link">
        About us
      </Link>
      <Link to={'/contact'} className="link">
      Contact
      </Link>
    </div>

    {/* Sign Up Button (Visible on laptop screens and above) */}
    <div className="hidden laptop:fpl-40 laptop:block">
    <Link to={'/login'} className="link mr-2">
    <button className="px-4 py-2 rounded-md hover:bg-[#ff9900] hover:text-white transition-colors duration-200">Login</button>
    </Link>
    <Link to={'/register'}>
    <button className="bg-[#ff9900] text-white px-4 py-2 rounded-md">Sign Up</button>
    </Link>
    </div>
  </div>

  {/* Dropdown Menu (Visible on phone screens when hamburger is clicked) */}
  {isOpen && (
    <div className="ham phone:flex tablet:hidden flex flex-col space-y-2 mt-4">
      <Link to={'/'} className="link hover:bg-gray-300 px-4 py-2 rounded-md">
      Home
      </Link>
      <Link to={'/'} className="link hover:bg-gray-300 px-4 py-2 rounded-md">
      Courses
      </Link>
      <Link to={'/'} className="link hover:bg-gray-300 px-4 py-2 rounded-md">
      Pricing
      </Link>
      <Link to={'/about'} className="link hover:bg-gray-300 px-4 py-2 rounded-md">
        About
      </Link>
      <Link to={'/contact'} className="link hover:bg-gray-300 px-4 py-2 rounded-md">
      Contact
      </Link>
      <Link to={'/login'} >
      <button className="bg-[#F7F7F8] w-full text-black px-4 py-2 rounded-md hover:bg-slate-200 transition-colors duration-200">Login</button>
      </Link>
      <Link to={'/register'}>
      <button className="bg-[#ff9900] w-full text-white  px-4 py-2 rounded-md hover:font-[600] transition duration-200">Sign Up</button>
      </Link>

    </div>
  )}
</nav>
    </>
  );
};

export default Navbar;
