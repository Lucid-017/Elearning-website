import "../Layout/css/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar bg-slate-600 px-20 py-5 ">
      <div className="flex">
        {/* <div className=""> */}
          {/* <FaGithub className="inline pr-2 text-5xl text-white"/>
            <Link to="/" className="text-lg capitalize text-white font-bold align-middle">
                {title}
            </Link> */}
          {/* <h1 className='inline pr-2 text-3xl'>WEBSITE NAME</h1> */}
          <div className="px-5 ">
            <p>Home</p>
            <p>Courses</p>
            <p>About Us</p>
            <p>Pricing</p>
            <p>Contact</p>
          </div>
        {/* </div> */}
        <div className="flex flex-row-reverse">
          <div className="">
            {/* <Link to="/" className="btn btn-ghost btn-sm rounded-btn text-white">
                Home
            </Link>
            <Link to="/about" className="btn btn-ghost btn-sm rounded-btn text-white">
                About
            </Link> */}
            <p>Sign Up</p>
            <button className="btn">Login</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
