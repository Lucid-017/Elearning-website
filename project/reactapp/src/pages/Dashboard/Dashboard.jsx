import React, { useState, useEffect, useContext } from "react";
import "../css/Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import { CoursesContext } from "../../API and Contxt/Context/Courses";
import { AuthContext } from "../../API and Contxt/Context/AuthContext";
import axios from "axios";

const Dashboard = () => {
  // const [user, setUser] = useState("");
  const {timeElaspsed,timeFormat,timeArray} = useContext(CoursesContext)
  const {userInfo,user,setUser} = useContext(AuthContext)
  const [stats,setStats]= useState('')
  const navigate = useNavigate()
  const accessToken = userInfo.access_token;
  const date = new Date(); // Use the current date
const options = { month: 'short', day: '2-digit' };
const formattedDate = date.toLocaleString('en-US', options).replace(',', '-');

const fetchStats = async()=>{
  try {
    const response = await axios.get('api/get-student-statistics/',{
      headers:{
        "Content-Type":"application/json",
        Authorization: `Bearer ${accessToken}`,
      }
    })
    console.log(response.data)
    setStats(response.data)
  } catch (error) {
    console.log(error)
  }
}
const handleRouteToQuiz = (quiz) => {
  // instead of routing, make a direct call, quiz Slug = quiz id
  // const response = await axios.get(`api/quizzes/${quiz.title}`, {
  //   headers: {
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  //   // params: { quiz_id: quiz.id },
  // });
  // console.log(response.data);
  let sub= quiz.subject.toLowerCase()
  let level= quiz.grade_level.toLowerCase()
  const route = `/learning/${sub}/${level}/${quiz.slug}`
  console.log(route, 'route clicked')
  navigate(route)
}
useEffect(()=>{fetchStats()},[])

  return (
    <div className="px-10 phone:px-20">
      <div className="welcome mb-5 ">
        <h3 className="font-[500] pl-8">Hi {userInfo.username}, Welcome!</h3>
      </div>

      <div className="bg-white rounded my-10 laptop:mb-14 px-5 phone:p-10 tablet:px-20 shadow-md">
        <div className="pb-5">
          <p className="font-[500]">In this week({formattedDate} - today)</p>
          <small>See how you’ve performed this week</small>
        </div>
        <div className="grid grid-cols-1 pb-10  text-center tablet:grid-cols-2 laptop:grid-cols-3  gap-10 ">
          <div className="questions">
            <div className="summary-stats">
              <div className="summary-stats-grid">
              <FontAwesomeIcon className="icon text-[#00FF00]" icon={icons.faPencil}/>
                <div className="stats-delta-info">
                  <div className="stats-info">
                    <div className="stats-text">You've answered</div>
                    <div className="stats-data">
                      <span className="stats-number">{stats.total_questions_answered}</span>
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
                      <span className="stats-number">{stats.total_time_spent}</span>
                      <span className="stats-unit">(s) learning</span>
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
                      <span className="stats-number">{stats.total_quiz_completed}</span>
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
          <Link className="no-underline" to={"/learning"}>
            <p className="text-[#FF9500]">Continue Learning</p>
          </Link>
        </div>
      </div>

      <div className="welcome mb-5 ">
        <h3 className="font-[500] pl-8">Pick up where you left off</h3>
      </div>
      <div className=" bg-slate-white shadow-md p-5 rounded-md tablet:px-10">
        <div className="pb-5">
          <p className="font-[500]">Recent Courses</p>
        </div>
        <div className="pb-10 text-center">
          <div>
            <ul >
              {stats.recent_quizzes?.map((recent,index)=>(
              <li className="mb-2" key={recent.title}>
              <div className="recent py-2 px-10 flex flex-col phone:flex-row items-center justify-between">
                <div className="flex items-center text-start capitalize">
                  {/* <img src="icon1.png" alt="Icon 1" class="h-6 w-6 mr-2" /> */}
                  <FontAwesomeIcon
                    className="icon  pr-5 text-[#ff9900]"
                    icon={icons.faStar}
                  />

                  <div onClick={()=>handleRouteToQuiz(recent)} className="details cursor-pointer">
                    <p className="title text-[#ff9900]">
                      {recent.title}
                    </p>
                    <small>{recent.grade_level}, {recent.subject}</small>
                  </div>
                </div>
                {/* <img src="icon2.png" alt="Icon 2" class="h-6 w-6" /> */}
                <FontAwesomeIcon
                  className="icon text-[#708090]"
                  icon={icons.faGlasses}
                />
              </div>
            </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
