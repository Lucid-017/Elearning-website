import { useContext, useEffect, useState } from "react";
import "./Css/YearLevel.css";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { CoursesContext } from "../../API and Contxt/Context/Courses";
import Grade from "./Grade";
import { useToast } from "../../API and Contxt/Context/ToastContext";

const YearLevels = () => {
  const [yearLevels, setYearLevels] = useState([]);
  const [selectedYear,setSelectedYear] =useState(null)
  const {getYear,setLoading,setError,error,loading} =useContext(CoursesContext)
  const { subject } = useParams(); // Extract the 'subject' slug from the URL
  const navigate = useNavigate();
  const { showToast } = useToast();

  
  // const {setError,getGradeCourse,setLoading} =useContext(CoursesContext)


  const fetchYearLevels = async () => {
    try {
      setLoading(true);
      // gets the subject from the url
      const response = await getYear(subject) //default redirect on initial render
      setYearLevels(response);
      // showToast('Year levels loaded successfully', 'success');
      console.log(response);
      console.log(subject, "subject from url");
      // showToast(response.data,'success')
    } catch (error) {
      setError("Failed to load year levels");
      console.error("Error fetching year levels:", error.message);
      showToast(error.message, "error");
    } finally {
      setLoading(false);
    }
    //TODO store last visted website, Implement efficiently
    // localStorage.setItem('lastVisitedSubject',`learning/${subject}`)
    // console.log(subject)
  };

  useEffect(() => {
    // Reset states when the subject changes
    if(!subject) return;
    setYearLevels([]);
    setError(null);
     fetchYearLevels();
  }, [subject]);


  const handleGrade = async (grade) => {
    setSelectedYear(grade)
      navigate(`${grade}`)
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {/* when year is selected, show the Grade Component */}
      {!selectedYear && (
        <div className="grid grid-cols-1 p-2 phone:grid-cols-2 laptop:grid-cols-3 gap-6">
        {yearLevels?.map((yearLevel) => (
          <div key={yearLevel.id} onClick={()=>handleGrade(yearLevel.slug)} >
            <div class="grade-module">     
                <div class="grade-box-tab ">{yearLevel.level === 'Reception' ? 'R' :yearLevel.order_number}</div>
                <p class="grade-box-hdr font-semibold text-2xl">
                  <span class="block phone:hidden grade-box-short-name grade-box-name">
                  {yearLevel.order_number}
                  </span>
                  <span class="hidden phone:block grade-box-long-name grade-box-name text-black hover:text-[#ff9500] ">
                    {yearLevel.level}
                  </span>
                </p>
              <div class="hidden tablet:block grade-body">
                <div class="grade-description" escapehtml="false">
                  {/* list 4 topics included in course and prefix for mroe */}
                  <p>Counting objects, inside and outside, longer and shorter, letter
                  names, rhyming words, and more.</p>

                </div>
  
                <ul class="list-subject-links">
                  <li class="subject-link-item math">
                    <div class="subject-skill-container flex justify-between">
                      <small class="">Skills</small>
                      <div
                        class="skill-lk"
                       >
                        <span className="text-[#ff9500]">{yearLevel.total_skills}</span>
                      </div>
                    </div>
                  </li>
  
                  <li class="subject-link-item language-arts">
                    {/* <div class="subject-skill-container">
                    {yearLevel.skills.map((skill,index) => (
                       <span key={skill.slug}> {skill.name}
                       {index < yearLevel.skills.length - 1 && ' | '}
                       </span>
                    ))}
                    </div> */}
                  </li>
                </ul>
              </div>
            </div>
            {/* </Link> */}
          </div>
        ))}
      </div> 
      )}
       
      <Outlet/>
    </div>

  );
};

export default YearLevels;
