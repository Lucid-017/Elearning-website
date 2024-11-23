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
    // const location = useLocation();
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
      //  Trigger fetch requests(streamlined to avoid unnecessary setState calls)
    (async ()=>{
      try{
        await Promise.all([fetchYearLevels()])
      }catch(err){
        console.log(err)
      }
    })();
    // fetchYearLevels();
    // fetchTopics();
  }, [subject]);


  const handleGrade = async (grade) => {
    // fet courses for the selected year
    // navigate(`${subject}/${grade}`);
    setSelectedYear(grade)
    // if(location.pathname.includes(`${subject}/`)){
      navigate(`${grade}`)
    // }
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
             {/* <Link
                class="grade-box-link"
                to={`${subject}/grade-1`}
              > */}
            <div class="grade-module blue1-bdr">
             
                <div class="grade-box-tab ">{yearLevel.level === 'Reception' ? 'R' :yearLevel.order_number}</div>
                <h2 class="grade-box-hdr blue1-text">
                  <span class="block phone:hidden grade-box-short-name grade-box-name">
                  {yearLevel.order_number}
                  </span>
                  <span class="hidden phone:block grade-box-long-name grade-box-name text-black ">
                    {yearLevel.level}
                  </span>
                </h2>
              <div class="hidden tablet:block grade-body">
                <div class="grade-description" escapehtml="false">
                  {/* list 4 topics included in course and prefix for mroe */}
                  Counting objects, inside and outside, longer and shorter, letter
                  names, rhyming words, and more.
                </div>
  
                <ul class="list-subject-links">
                  <li class="subject-link-item math">
                    <div class="subject-skill-container flex justify-between">
                      <small class="">Skills</small>
                      <div
                        class="skill-lk"
                       >
                        <span class="lk-txt">{yearLevel.total_skills}</span>
                      </div>
                    </div>
                  </li>
  
                  <li class="subject-link-item language-arts">
                    <div class="subject-skill-container">
                    {yearLevel.skills.map((skill,index) => (
                       <span key={skill.slug}> {skill.name}
                       {index < yearLevel.skills.length - 1 && ' | '}
                       </span>
                    ))}
                    </div>
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
