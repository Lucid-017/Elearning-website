import React from "react";

const Footer = () => {
  return (
    <footer className="w-full p-20">
      <div className="grid grid-cols-5">
        <div className="logo col-span-2">
          <h2><span className="text-[#FF9500]">E</span>BEDMAS</h2>
        </div>
        <div className="home">
          <p>Home</p>
          <ul>
            <li>Courses</li>
            <li>Benefits</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div className="about-us">
          <p>About Us</p>
          <ul>
            <li>Our Goals</li>
            <li>Achievements</li>
          </ul>
        </div>
        <div className="socials">
          <p>Social profiles</p>
          <div className="flex"></div>
        </div>
      </div>
      <div className="text-center mt-10">
        <p>&copyright; 2024 Ebedmas. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
