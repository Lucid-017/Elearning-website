import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../API and Contxt/Context/AuthContext";
import "../Layout/css/Navbar.css";
import Logo from "../../assets/EBEDMAS Logo 0.1.png";
import MobileLogo from "../../assets/Logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { subject } = useParams();
  const navigate = useNavigate();
  const [isTabletOrLaptop, setIsTabletOrLaptop] = useState(window.innerWidth >= 768);

  // Efficient event listener setup for resizing
  useEffect(() => {
    const handleResize = () => {
      setIsTabletOrLaptop(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="mt-5 px-5 phone:px-10 tablet:px-20 tablet:mb-5">
      <div className="w-full flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-black no-underline">
          <img
            className={`logo mobile ${isTabletOrLaptop ? "hidden" : "block"}`}
            src={MobileLogo}
            alt="Ebedmas logo"
          />
          <img
            className={`logo ${isTabletOrLaptop ? "block" : "hidden"}`}
            src={Logo}
            alt="Ebedmas logo"
          />
        </Link>

        {/* Hamburger Menu */}
        {!isTabletOrLaptop && (
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        )}

        {/* Navigation Links */}
        {isTabletOrLaptop ? (
          <div className="space-x-4">
            {user ? (
              <>
                <Link to="/dashboard" className="link">
                  Dashboard
                </Link>
                <Link to={`/learning/${subject || "maths"}`} className="link">
                  Learning
                </Link>
                <Link to="/pricing" className="link">
                  Subscription
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn-submit hover:bg-[#ff9900]"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/" className="link">
                  Home
                </Link>
                <Link to="/pricing" className="link">
                  Pricing
                </Link>
                <Link to="/about" className="link">
                  About Us
                </Link>
                <Link to="/contact" className="link">
                  Contact
                </Link>
                <Link to="/login" className="link">
                  Login
                </Link>
                <Link to="/register">
                  <button className="bg-[#ff9900] text-white px-4 py-2 rounded-md">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        ) : (
          isOpen && (
            <div className="flex flex-col space-y-2 mt-4">
              {user ? (
                <>
                  <Link to="/dashboard" className="link">
                    Dashboard
                  </Link>
                  <Link to={`/learning/${subject || "maths"}`} className="link">
                    Learning
                  </Link>
                  <Link to="/pricing" className="link">
                    Subscription
                  </Link>
                  <Link to="/settings" className="link">
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-[#F7F7F8] w-full text-black px-4 py-2 rounded-md hover:bg-slate-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/" className="link">
                    Home
                  </Link>
                  <Link to="/pricing" className="link">
                    Pricing
                  </Link>
                  <Link to="/about" className="link">
                    About
                  </Link>
                  <Link to="/contact" className="link">
                    Contact
                  </Link>
                  <Link to="/login">
                    <button className="bg-[#F7F7F8] w-full text-black px-4 py-2 rounded-md hover:bg-slate-200">
                      Login
                    </button>
                  </Link>
                  <Link to="/register">
                    <button className="bg-[#ff9900] w-full text-white px-4 py-2 rounded-md">
                      Sign Up
                    </button>
                  </Link>
                </>
              )}
            </div>
          )
        )}
      </div>
    </nav>
  );
};

export default Navbar;
