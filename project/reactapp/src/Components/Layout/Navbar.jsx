import "../Layout/css/Navbar.css";

const Navbar = () => {
  return (
    <>
        <nav class="navbar">
        <div class="nav-left">
        <h1 className='inline pr-10 text-3xl'>EBEDMAS</h1>
        <ul class="nav-links">
                <li><a href="#">Home</a></li>
                <li><a href="#">Courses</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </div>
        <div class="nav-right">
            <button class="sign-up">Sign Up</button>
        </div>
    </nav>
    </>
   
  );
};

export default Navbar;
