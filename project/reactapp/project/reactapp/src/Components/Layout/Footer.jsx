import "../Layout/css/Footer.css";
import Logo from "../../assets/EBEDMAS Logo 0.1.png";
import MobileLogo from "../../assets/Logo.png";

const Footer = () => {
  return (
    <>
      <footer className="w-full p-10 mt-10 tablet:px-20 bg-white">
        <div className="flex flex-col phone:flex-row gap-10 ">
          {/* Logo */}
          <div className="logo flex-1">
            <img
              className="hidden logo phone:block"
              src={Logo}
              alt="Ebedmas logo"
            />
            <img
              className="logo mobile phone:hidden"
              src={MobileLogo}
              alt="Ebedmas logo"
            />

            <div className="">
              <p>e_bedmas@yahoo.com</p>
              <p>090 000 000 00</p>
              <p>Lagos, Nigeria</p>
            </div>
          </div>

          {/* Home Section */}
          <div className="home">
            <p className="font-semibold">Home</p>
            <ul className="space-y-2">
              <li>Courses</li>
              <li>Benefits</li>
              <li>FAQ</li>
            </ul>
          </div>

          {/* About Us Section */}
          <div className="about-us">
            <p className="font-semibold">About Us</p>
            <ul className="space-y-2">
              <li>Our Goals</li>
              <li>Achievements</li>
            </ul>
          </div>

          {/* Socials Section */}
          <div className="socials">
            <p className="font-semibold">Social profiles</p>
            <div className="flex space-x-4">{/* Icons would go here */}</div>
          </div>
        </div>

        {/* Footer Bottom Text */}
        <div className="text-center mt-10 text-gray-400">
          <p>&copy; 2024 Ebedmas. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
