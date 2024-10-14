import '../Layout/css/Footer.css'

const Footer = () => {
  return (
    <>
    <footer className="w-full p-10 mt-20 tablet:p-20 bg-white text-black">
  <div className="grid grid-cols-1 phone:grid-cols-4 tablet:grid-cols-5 gap-10 ">
    {/* Logo */}
    <div className="logo col-span-1 phone:col-span-2">
      <h2 className="text-3xl font-bold overflow-hidden">
        <span className="text-[#FF9500]">E</span>BEDMAS
      </h2>
      <div className='pt-5'>
        <p>@email.Confirm</p>
        <p>090 000 000 00</p>
        <p>somewhere in lagos</p>
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
      <div className="flex space-x-4">
        {/* Icons would go here */}
      </div>
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
