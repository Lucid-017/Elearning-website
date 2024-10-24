import React, { useState, useEffect } from "react";
import "../css/Dashboard.css";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState("");

  // Find another way to access username, local storage is only dependent on if user uses the remember me option
  useEffect(() => {
    const userInfoString = localStorage.getItem('user_info');
    const userInfo = JSON.parse(userInfoString);
    // Now userInfo will be an object with access_token, refresh_token, and username
    setUser(userInfo.username);    
  }, []);

  return (
    <div className="px-10 phone:px-20">
      <div className="welcome mb-5 ">
        <h2 className="font-[500] pl-8">Hi {user}, Welcome!</h2>
      </div>
      <div className="bg-white px-5 phone:px-10 tablet:px-20 py-10">
        <div className="pb-5">
          <p className="font-[500]">In this week(14 Oct - today)</p>
          <small>See how you’ve performed this week</small>
        </div>
        <div className="grid grid-cols-1 pb-10  tablet:grid-cols-2 laptop:grid-cols-3  gap-10 ">
          <div className="questions">
            <div>
              <p><span>icon</span> You've answered</p>
              <p><span className="text-3xl font-bold">99</span> questions</p>
            </div>
            <div className="pt-5">
              <p>-3 questions</p>
              <p>from your weekly avg</p>
            </div>
          </div>
          <div className="minutes">
            <div>
              <p><span>icon</span> You've spent  </p>
              <p><span className="text-3xl font-bold">45</span> mins learning</p>
            </div>
            <div className="pt-5">
              <p>-19 mins </p>
              <p>from your weekly avg</p>
            </div>
          </div>
          <div className="progress">
            <div>
              <p><span>icon</span> You've made progress in</p>
              <p><span className="text-3xl font-bold">3</span> Skills</p>
            </div>
            <div className="pt-5">
              <p>-1 skill</p>
              <p>from your weekly avg</p>
            </div>
          </div>

        </div>
        <div className="text-center">
        <p>Keep up the great work!</p>
        <Link className="no-underline" to={'/courses'}>
         <p className="text-[#FF9500]">Continue Learning</p>
        </Link>
      </div>
      </div>

    </div>
  );
};

export default Dashboard;
