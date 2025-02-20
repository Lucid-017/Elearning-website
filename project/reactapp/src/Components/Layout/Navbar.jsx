import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../API and Contxt/Context/AuthContext";
import "../Layout/css/Navbar.css";
import Logo from "../../assets/EBEDMAS Logo 0.1.png";
import MobileLogo from "../../assets/Logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const { subject } = useParams();
  const navigate = useNavigate();
  const [isTabletOrLaptop, setIsTabletOrLaptop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => setIsTabletOrLaptop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="mt-5 px-5 phone:px-10 tablet:px-20 tablet:mb-5">
      <div className="w-full flex justify-between items-center">
        {/* Logo */}
        <Link to="/" onClick={closeMenu}>
          <img
            className={`logo ${isTabletOrLaptop ? "block" : "hidden"}`}
            src={Logo}
            alt="Ebedmas logo"
          />
          <img
            className={`logo mobile ${isTabletOrLaptop ? "hidden" : "block"}`}
            src={MobileLogo}
            alt="Ebedmas logo"
          />
        </Link>

        {/* Hamburger Menu */}
        {!isTabletOrLaptop && (
          <button onClick={toggleMenu} className="focus:outline-none">
            {isOpen ? (
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
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
                />
              </svg>
            )}
          </button>
        )}

        {/* Navigation Links */}
        {isTabletOrLaptop ? (
          <div className="space-x-4">
            {user ? (
              <>
                <Link to="/dashboard" className="link">Dashboard</Link>
                <Link to={`/learning/${subject || "maths"}`} className="link">Learning</Link>
                <Link to="/settings" className="link">Settings</Link>
                <button onClick={handleLogout} className="btn-submit hover:bg-[#ff9900]">Logout</button>
              </>
            ) : (
              <>
                <Link to="/" className="link">Home</Link>
                <Link to="/pricing" className="link">Pricing</Link>
                <Link to="/about" className="link">About Us</Link>
                <Link to="/contact" className="link">Contact</Link>
                <Link to="/login" className="link">Login</Link>
                <Link to="/register">
                  <button className="bg-[#ff9900] text-white px-4 py-2 rounded-md">Sign Up</button>
                </Link>
              </>
            )}
          </div>
        ) : (
          isOpen && (
            <div className="dropdown absolute right-0 top-16 mt-2 bg-white shadow-md rounded-md w-48 z-50 animate-slide-down">
              <div className="flex flex-col p-4 space-y-2">
                {user ? (
                  <>
                    <Link to="/dashboard" onClick={closeMenu} className="dropdown-link">Dashboard</Link>
                    <Link to={`/learning/${subject || "maths"}`} onClick={closeMenu} className="dropdown-link">Learning</Link>
                    <Link to="/pricing" onClick={closeMenu} className="dropdown-link">Subscription</Link>
                    <Link to="/settings" onClick={closeMenu} className="dropdown-link">Settings</Link>
                    <button onClick={handleLogout} className="bg-gray-100 text-black w-full px-4 py-2 rounded-md hover:bg-gray-200">Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/" onClick={closeMenu} className="dropdown-link">Home</Link>
                    <Link to="/pricing" onClick={closeMenu} className="dropdown-link">Pricing</Link>
                    <Link to="/about" onClick={closeMenu} className="dropdown-link">About</Link>
                    <Link to="/contact" onClick={closeMenu} className="dropdown-link">Contact</Link>
                    <Link to="/login">
                      <button onClick={closeMenu} className="bg-gray-100 text-black w-full px-4 py-2 rounded-md hover:bg-gray-200">Login</button>
                    </Link>
                    <Link to="/register">
                      <button onClick={closeMenu} className="bg-[#ff9900] text-white w-full px-4 py-2 rounded-md">Sign Up</button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </nav>
  );
};

export default Navbar;
