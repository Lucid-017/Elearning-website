import { useState, useEffect } from "react";
import "../Layout/css/Navbar.css";
import { Link, useNavigate, useParams, } from "react-router-dom";
import { useAuth } from "../../API and Contxt/Context/AuthContext";
import Logo from '../../assets/EBEDMAS Logo 0.1.png'
import MobileLogo from '../../assets/Logo.png'
/* NOTE 
update state across app 
Handle the global state change on login and logout
we will also create a second navigation if the user is on the Learning page
*/
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [isLearning, setIsLearning] = useState(false);
  const { user, logout } = useAuth();
  const { subject } = useParams(); // Extract the 'subject' slug from the URL
  // const location = useLocation(); // Extract the 'subject' slug from the URL
  const navigate = useNavigate();
  const isLaptop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(max-width: 1023px)");

  // Toggle the mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // runs our logout frim our auth context and removes our token from local storage
    logout();
    navigate("/login");
  };

  function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
      const mediaQueryList = window.matchMedia(query);

      const handleMediaChange = (event) => {
        setMatches(event.matches);
      };

      // Check initial match
      setMatches(mediaQueryList.matches);

      // Add listener to handle changes
      mediaQueryList.addEventListener("change", handleMediaChange);

      // Cleanup on component unmount
      return () => {
        mediaQueryList.removeEventListener("change", handleMediaChange);
      };
    }, [query]);

    return matches;
  }

  return (
    <>
      <nav className="mt-5 px-5 phone:px-10 tablet:px-20 tablet:mb-5">
        <div className="w-full flex justify-around items-center justify-center">
          {/* Logo */}
          <Link to="/" className="text-black no-underline ">
            {/* <h1 className="font-bold overflow-hidden">EBEDMAS</h1>
             */}
             <img className="hidden logo phone:block" src={Logo} alt="Ebedmas logo" />
             <img className="logo mobile phone:hidden" src={MobileLogo} alt="Ebedmas logo" />
          </Link>
          {/* Hamburger Icon (Visible on phone screens) */}
          <div className="phone:block tablet:hidden">
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
          </div>

          {/* Navbar Links (Hidden on phone screens, visible on tablet and above) */}
          <div className="hidden middle tablet:flex">
            {user ? (
              <div>
                <Link to={"/dashboard"} className="link">
                  My Dashboard
                </Link>
                <Link to={`/learning/${subject || 'maths'}`} className="link">
                  Learning
                </Link>
                {/* navbar on tablet screen should include logout button */}
                {isTablet && (
                  <>
                    {/* <Link className="link"> */}
                      <button
                        onClick={handleLogout}
                        className=" py-2 rounded-md hover:bg-[#ff9900] hover:text-white transition-colors duration-200"
                      >
                        Log out
                      </button>
                    {/* </Link> */}
                  </>
                )}
                {isLaptop && (
                  <>
                    <Link to={"/pricing"} className="link">
                      Subscription
                    </Link>
                  </>
                )}
              </div>
            ) : (
              <div>
                <Link to={"/"} className="link">
                  Home
                </Link>
                <Link to={"/pricing"} className="link">
                  Pricing
                </Link>
                <Link to={"/about"} className="link">
                  About us
                </Link>
                <Link to={"/contact"} className="link">
                  Contact
                </Link>
              </div>
            )}
          </div>

          {/* Sign Up Button (Visible on laptop screens and above) */}
          <div className="hidden laptop:pl-40 laptop:flex ">
            {user ? (
              <>
                <Link to={"/logout"} className="link">
                  <button className="px-4 py-2 rounded-md hover:bg-[#ff9900] hover:text-white transition-colors duration-200">
                    Settings
                  </button>
                </Link>

                <Link
                  onClick={handleLogout}
                  className=" link px-4 py-2 rounded-md hover:bg-[#ff9900] hover:text-white transition-colors duration-200"
                >
                  Log out
                </Link>
              </>
            ) : (
              <>
                <Link to={"/login"} className="link">
                  <button className="px-4 py-2 rounded-md hover:bg-[#ff9900] hover:text-white transition-colors duration-200">
                    Login
                  </button>
                </Link>
                <Link to={"/register"}>
                  <button className="bg-[#ff9900] text-white px-4 py-2 rounded-md">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Dropdown Menu (Visible on phone screens when hamburger is clicked) */}
        <div className="ham phone:flex tablet:hidden flex flex-col space-y-2 mt-4">
          {/* if user is logged in then check if hamburger has been clicked */}
          {user && isOpen ? (
            <div>
              <Link
                to={"maths"}
                className="link hover:bg-gray-300 px-4 py-2 rounded-md"
              >
                Maths
              </Link>
              <Link
                to={"english"}
                className="link hover:bg-gray-300 px-4 py-2 rounded-md"
              >
                English
              </Link>
              <Link
                to={"recommendations"}
                className="link hover:bg-gray-300 px-4 py-2 rounded-md"
              >
                Recommendations
              </Link>
              <Link
                to={"/dashboard"}
                className="link hover:bg-gray-300 px-4 py-2 rounded-md"
              >
                Dashboard
              </Link>
              <Link
                to={"/subscription"}
                className="link hover:bg-gray-300 px-4 py-2 rounded-md"
              >
                Subscription
              </Link>
              <Link
                to={"/settings"}
                className="link hover:bg-gray-300 px-4 py-2 rounded-md"
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="bg-[#F7F7F8] w-full text-black px-4 py-2 rounded-md hover:bg-slate-200 transition-colors duration-200"
              >
                Log out
              </button>
            </div>
          ) : (
            <div>
              {isOpen && (
                <div>
                  <Link
                    to={"/"}
                    className="link hover:bg-gray-300 px-4 py-2 rounded-md"
                  >
                    Home
                  </Link>
                  <Link
                    to={"/"}
                    className="link hover:bg-gray-300 px-4 py-2 rounded-md"
                  >
                    Pricing
                  </Link>
                  <Link
                    to={"/about"}
                    className="link hover:bg-gray-300 px-4 py-2 rounded-md"
                  >
                    About
                  </Link>
                  <Link
                    to={"/contact"}
                    className="link hover:bg-gray-300 px-4 py-2 rounded-md"
                  >
                    Contact
                  </Link>
                  <Link to={"/login"}>
                    <button className="bg-[#F7F7F8] w-full text-black px-4 py-2 rounded-md hover:bg-slate-200 transition-colors duration-200">
                      Login
                    </button>
                  </Link>
                  <Link to={"/register"}>
                    <button className="bg-[#ff9900] w-full text-white  px-4 py-2 rounded-md hover:font-[600] transition duration-200">
                      Sign Up
                    </button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
