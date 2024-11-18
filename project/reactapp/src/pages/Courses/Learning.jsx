import axios from "axios";
import React, { useEffect, useState } from "react";
import YearLevels from "../Courses/YearLevels";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useToast } from "../Login/context/ToastContext";
import "./Css/Learning.css";
import Topics from "./Topics";

/**We're going to get courses by year,
 * on default, when navigated to, the course component renders the last visted year
 * so fro now we will spool year one and render its title
 * so we want to render the year, its title and access its available topics
 */

const Learning = () => {
  // const navigate = useNavigate();
  // const location = useLocation();
  const [yearLevels, setYearLevels] = useState([]);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { subject } = useParams(); // Extract the 'subject' slug from the URL
  const { showToast } = useToast();
  const [viewBy,setViewBy] = useState(['Years','Topics'])//static options array
  const [selectedView,setSelectedView] = useState('Years')//Default years

  // handle which filter is being clicked
  const handleFilterChange = (fil)=>{
    // setSelectedView('')
    setSelectedView(fil)
    console.log(fil, 'has been clicked')
    // if topic was selected then get topics
    // if(selectedView === 'Topics'){
    //   return fetchTopics()
    // }
  }

  const fetchTopics = async () =>{
    try {
      setLoading(true);
      // gets the subject from the url
      const response = await axios.get(
        `/api/topics/${subject || "maths"}/`
      ); //default redirect on initial render
      setTopics(response.data);
      // showToast('Year levels loaded successfully', 'success');
      console.log(response.data, 'TOPIC DATA');
      // console.log(subject, "subject from url");
      // showToast(response.data,'success')
    } catch (error) {
      setError("Failed to load year levels");
      console.error("Error fetching year levels:", error);
      showToast(error.response?.data?.error, "error");
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    // Reset states when the subject changes
    setYearLevels([]);
    setTopics([])
    setError(null);
    // console.log(filters)


    const fetchYearLevels = async () => {
      try {
        setLoading(true);
        // gets the subject from the url
        const response = await axios.get(
          `/api/year-levels/${subject || "maths"}/`
        ); //default redirect on initial render
        setYearLevels(response.data);
        // showToast('Year levels loaded successfully', 'success');
        console.log(response.data);
        console.log(subject, "subject from url");
        // showToast(response.data,'success')
      } catch (error) {
        setError("Failed to load year levels");
        console.error("Error fetching year levels:", error);
        showToast(error.response?.data?.error, "error");
      } finally {
        setLoading(false);
      }
      //TODO store last visted website, Implement efficiently
      // localStorage.setItem('lastVisitedSubject',`learning/${subject}`)
      // console.log(subject)
    };

    fetchYearLevels();
    fetchTopics();
  }, [subject]);

  return (
    <div>
      {/* links to the our topcs */}
      {/* if user is in learning page */}
      <nav className="py-10 px-5 hidden phone:block phone:px-10 tablet:px-20 bg-slate-700 tablet:mb-10">
        <div className="w-full ">
          {/* Navbar Links (Hidden on phone screens, visible on tablet and above) */}
          <div className="learning grid grid-cols-1 phone:grid-cols-3 ">
            <Link to={"maths"} className="link">
              Maths
            </Link>
            <Link to={"english"} className="link">
              English
            </Link>
            <Link to={"recommendations"} className="link">
              Recommendations
            </Link>
          </div>
        </div>
      </nav>
      {/* filter */}
      <div
        class="filter flex"
      >
        <span class="text-slate-600">View by:</span>
        {
        viewBy.map((filter,index)=>(
          <button
          key={index}
          className="mr-5 bg-slate-500" onClick={()=>handleFilterChange(filter)}>
            {filter}
          </button>
        ))}

      </div>

      {/* )} */}
      <div>
        {!loading && !error && yearLevels.length > 0 ? (
          <div className="px-5 phone:px-10 tablet:px-20 tablet:mb-10">
            {/* dispaly levels on default and dsiplay topics on click */}
            {selectedView === 'Years'? (
              <YearLevels
              subject={subject}
              loading={loading}
              error={error}
              yearLevels={yearLevels}
            />
            ):(
             <Topics subject={subject || 'maths'} topics={topics}/> 
            )}
            
          </div>
        ) : (
          <div>No year levels found for this topic</div>
        )}
      </div>
    </div>
  );
};

export default Learning;
