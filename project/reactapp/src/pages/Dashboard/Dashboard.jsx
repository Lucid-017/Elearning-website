import React, { useState, useEffect } from "react";
import "../css/Dashboard.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const [user, setUser] = useState("");
  const date = new Date(); // Use the current date
const options = { month: 'short', day: '2-digit' };
const formattedDate = date.toLocaleString('en-US', options).replace(',', '-');

  // Find another way to access username, local storage is only dependent on if user uses the remember me option
  useEffect(() => {
    const userInfoString = localStorage.getItem("user_info");
    const userInfo = userInfoString ? JSON.parse(userInfoString) : {};
    // Now userInfo will be an object with access_token, refresh_token, and username
    setUser(userInfo.username || "guest");
  }, []);

  return (
    <div className="px-10 phone:px-20">
      <div className="welcome mb-5 ">
        <h2 className="font-[500] pl-8">Hi {user}, Welcome!</h2>
      </div>

      <div className="bg-white mb-32 laptop:mb-14 px-5 phone:px-10 tablet:px-20 py-10">
        <div className="pb-5">
          <p className="font-[500]">In this week({formattedDate} - today)</p>
          <small>See how you’ve performed this week</small>
        </div>
        <div className="grid grid-cols-1 pb-10  text-center laptop:grid-cols-3  gap-10 ">
          <div className="questions">
            <div className="summary-stats">
              <div className="summary-stats-grid">
              <FontAwesomeIcon className="icon text-[#00FF00]" icon={icons.faPencil}/>
                <div className="stats-delta-info">
                  <div className="stats-info">
                    <div className="stats-text">You've answered</div>
                    <div className="stats-data">
                      <span className="stats-number">63</span>
                      <span className="stats-unit">questions</span>
                    </div>
                  </div>
                  <div className="delta-info">
                    <div className="delta-data negative">-39 questions</div>
                    <div className="delta-text">from your weekly avg.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="questions">
            <div className="summary-stats">
              <div className="summary-stats-grid">
              <FontAwesomeIcon className="icon text-[#5F9EA0]" icon={icons.faClock}/>
                <div className="stats-delta-info">
                  <div className="stats-info">
                    <div className="stats-text">You've spent</div>
                    <div className="stats-data">
                      <span className="stats-number">42</span>
                      <span className="stats-unit">mins learning</span>
                    </div>
                  </div>
                  <div className="delta-info">
                    <div className="delta-data negative">-22 mins</div>
                    <div className="delta-text">from your weekly avg.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="questions">
            <div className="summary-stats">
              <div className="summary-stats-grid">
              <FontAwesomeIcon className="icon text-[#DDA0DD]" icon={icons.faBrain}/>
                <div className="stats-delta-info">
                  <div className="stats-info">
                    <div className="stats-text">You've made progress in</div>
                    <div className="stats-data">
                      <span className="stats-number">3</span>
                      <span className="stats-unit">skills</span>
                    </div>
                  </div>
                  <div className="delta-info">
                    <div className="delta-data negative">-1 skill</div>
                    <div className="delta-text">from your weekly avg.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="text-center">
          <p>Keep up the great work!</p>
          <Link className="no-underline" to={"/courses"}>
            <p className="text-[#FF9500]">Continue Learning</p>
          </Link>
        </div>
      </div>
      <div className="welcome mb-5 ">
        <h3 className="font-[500] pl-8">Pick up where you left off</h3>
      </div>
      <div className="bg-white px-5 tablet:px-10 py-10">
        <div className="pb-5">
          <p className="font-[500]">Recent Courses</p>
        </div>
        <div className="pb-10 text-center">
          <div>
            <ul>
              <li className="mb-2">
                <div className="recent px-10 flex items-center justify-between p-4">
                  <div className="flex items-center text-start capitalize">
                    {/* <img src="icon1.png" alt="Icon 1" class="h-6 w-6 mr-2" /> */}
                    <FontAwesomeIcon
                      className="icon  pr-5 text-[#ff9900]"
                      icon={icons.faStar}
                    />

                    <div className="details">
                      <p className="title text-[#ff9900]">
                        Multiply two fractions
                      </p>
                      <p>year 6, Math</p>
                    </div>
                  </div>
                  {/* <img src="icon2.png" alt="Icon 2" class="h-6 w-6" /> */}
                  <FontAwesomeIcon
                    className="icon text-[#708090]"
                    icon={icons.faGlasses}
                  />
                </div>
              </li>
              <li className="mb-2">
                <div className="recent px-10 flex items-center justify-between p-4">
                  <div className="flex items-center text-start capitalize">
                    {/* <img src="icon1.png" alt="Icon 1" class="h-6 w-6 mr-2" /> */}
                    <FontAwesomeIcon
                      className="icon  pr-5 text-[#ff9900]"
                      icon={icons.faStar}
                    />

                    <div className="details">
                      <p className="title text-[#ff9900]">
                        understanding intergers
                      </p>
                      <p>year 6, Math</p>
                    </div>
                  </div>
                  {/* <img src="icon2.png" alt="Icon 2" class="h-6 w-6" /> */}
                  <FontAwesomeIcon
                    className="icon text-[#708090]"
                    icon={icons.faGlasses}
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
