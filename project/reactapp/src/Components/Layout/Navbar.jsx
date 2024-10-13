import { useState } from "react";
import "../Layout/css/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <nav className="py-10 px-20">
        
  <div className="w-full flex justify-between">
   {/* Logo */}
   <Link to='/'>
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
      <Link to={'/'}>
        <a href="#" className="hover:text-gray-400">Home</a>
      </Link>
      <Link to={'/courses'}>
      <a href="#" className="hover:text-gray-400">Courses</a>
      </Link>
      <Link to={'/pricing'}>
      <a href="#" className="hover:text-gray-400">Pricing</a>
      </Link>
      <Link to={'/about'}>
      <a href="#" className="hover:text-gray-400">About us</a>
      </Link>
      <Link to={'/contact'}>
      <a href="#" className="hover:text-gray-400">Contact</a>
      </Link>
    </div>

    {/* Sign Up Button (Visible on laptop screens and above) */}
    <div className="hidden laptop:fpl-40 laptop:block">
    <Link to={'/login'}>
    <button className="px-4 py-2 rounded-md hover:bg-yellow-600">Login</button>
    </Link>
    <Link to={'/register'}>
    <button className="bg-[#ff9900] text-white px-4 py-2 rounded-md hover:bg-yellow-600">Sign Up</button>
    </Link>
    </div>
  </div>

  {/* Dropdown Menu (Visible on phone screens when hamburger is clicked) */}
  {isOpen && (
    <div className="phone:flex tablet:hidden flex flex-col space-y-2 mt-4">
      <a href="#" className=" hover:bg-gray-700 px-4 py-2 rounded-md">Home</a>
      <a href="#" className=" hover:bg-gray-700 px-4 py-2 rounded-md">Courses</a>
      <a href="#" className=" hover:bg-gray-700 px-4 py-2 rounded-md">Pricing</a>
      <a href="#" className=" hover:bg-gray-700 px-4 py-2 rounded-md">About us</a>
      <a href="#" className=" hover:bg-gray-700 px-4 py-2 rounded-md">Contact</a>
      <button className="bg-[#F7F7F8]  px-4 py-2 rounded-md hover:bg-yellow-600">Login</button>
      <button className="bg-[#ff9900]  px-4 py-2 rounded-md hover:bg-yellow-600">Sign Up</button>
    </div>
  )}
</nav>
    </>
  );
};

export default Navbar;
