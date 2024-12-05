import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import YearLevels from "../Courses/YearLevels";
import { Link, Navigate, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../API and Contxt/Context/ToastContext";
import "./Css/Learning.css";
import Topics from "./Topics";
import { CoursesContext } from "../../API and Contxt/Context/Courses";
// import Grade from "./Grade";

/**We're going to get courses by year,
 * on default, when navigated to, the course component renders the last visted year
 * so fro now we will spool year one and render its title
 * so we want to render the year, its title and access its available topics
 */

const Learning = () => {
   const navigate = useNavigate();
  const { subject = 'maths' } = useParams(); // Extract the 'subject' slug from the URL
  const [selectedView, setSelectedView] = useState("Years"); //Default years
  const [viewBy, setViewBy] = useState(["Years", "Topics"]); //static options array


  // // handle which filter is being clicked
  const handleFilterChange = (view) => {
    setSelectedView(view);
    if(view ==='Topics'){
       navigate(`topic`)
    }else if (view === 'Years'){
      navigate('')
    }
    console.log(view, "has been clicked");
  };


  return (
    <div>
      {/* links to the our topcs */}
      {/* if user is in learning page */}
      <nav className="py-5 px-5 hidden phone:block phone:px-10 tablet:px-20 bg-[#292f36]">
        <div className="w-full ">
          {/* Navbar Links (Hidden on phone screens, visible on tablet and above) */}
          <div className="learning flex flex-col justify-center justify-around  phone:flex-row ">
          {["maths", "english", "recommendations"].map((subj) => (
            <div
              key={subj}
              className={`link ${
                subject === subj ? "active" : ""
              }`}
              onClick={() => navigate(`/learning/${subj}`)}
            >
              {subj.charAt(0).toUpperCase() + subj.slice(1)}
            </div>
          ))}
          </div>
        </div>
      </nav>
      {/* filter */}
      <div class="filter text-center flex items-center flex-col px-20 phone:text-start phone:flex-row">
        <span class="text-slate-600">View by:</span>
        {["Years", "Topics"].map((view) => (
          <button
            key={view}
            className={`px-4 py-2 rounded-md ${
              selectedView === view ? "bg-[#ff9900] text-white" : ""
            }`}
            onClick={() =>handleFilterChange(view)}
          >
            {view}
          </button>
        ))}
        
      </div>
      <div className="hero">
        <div className="hcontent">
          <h1 className="uppercase p-2 z-10">{subject}</h1>
          <div className="details">
            {subject === "maths" ? (
              <p className="hidden phone:block">
                Gain fluency and confidence in maths! IXL helps students master
                essential skills at their own pace through fun and interactive
                questions, built in support and motivating awards.
              </p>
            ) : subject === "english" ? (
              <p className="hidden phone:block">
                From phonics and reading comprehension to writing strategies and
                more, IXL helps learners develop the communication skills needed
                for success in school, university and career.
              </p>
            ) : (
              <p className="hidden phone:block">
                IXL offers personalised skill recommendations based on what each
                student has been practising, so they can grow from where they
                are. If you have an IXL account, make sure to sign in to see
                your recommendations! Not a member yet? Select your year level
                to explore maths and English topics, and click on any skill
                you'd like to try!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* )} */}
      <div className="content">
        <div className="px-5 phone:px-10 tablet:px-20 tablet:mb-10">
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default Learning;
