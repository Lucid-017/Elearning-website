import axios from 'axios'
import React, { useEffect, useState } from 'react'
import YearLevels from '../YearLevels'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useToast } from '../Login/context/ToastContext'

/**We're going to get courses by year,
 * on default, when navigated to, the course component renders the last visted year
 * so fro now we will spool year one and render its title
 * so we want to render the year, its title and access its available topics
 */

const Learning = () => {
    const navigate =useNavigate()
    const location = useLocation()
    const [yearLevels, setYearLevels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { subject } = useParams(); // Extract the 'subject' slug from the URL
    const {showToast} = useToast;

    useEffect(() => {
        const fetchYearLevels = async () => {
          try {
            setLoading(true);
            const response = await axios.get(`/api/year-levels/${subject}/`);
            setYearLevels(response.data);
            console.log(response.data)
            console.log(subject, 'subject from url')
            // showToast(response.data,'success')
          } catch (error) {
            setError('Failed to load year levels');
            console.error('Error fetching year levels:', error);
            showToast(error.response?.data?.error,'error')
          } finally {
            setLoading(false);
          }
          // store last visted website
          // localStorage.setItem('lastVisitedSubject',`learning/${subject}`)
          // console.log(subject)
        };
    
        fetchYearLevels();
      }, [subject]);

    // useEffect(()=>{
    //     const lastVisitedSubject = localStorage.getItem('lastVistedSubject')
    //     console.log(lastVisitedSubject)
    //        // Only navigate if the last visited subject is different from the current path
    // if (lastVisitedSubject && lastVisitedSubject !== location.pathname) {
    //     navigate(lastVisitedSubject);
    //     console.log(lastVisitedSubject)
    //     setSubject(lastVisitedSubject)
    //   }else{
    //     const subject = 'maths'
    //     const currentPath = location.pathname
    //     console.log(currentPath)
    //     if(!currentPath.endsWith(subject)){
    //         navigate(`${currentPath}/${subject}`)
    //         setSubject(subject)
    //         console.log(`${currentPath}/${subject}`)
    //     }else{
    //         navigate(currentPath)
    //     }
        
    //   }
    //     return ()=>{
    //         return null
    //     }
    // },[navigate,location.pathname])

  return (
    <div>
        {/* links to the our topcs */}
          {/* if user is in learning page */}
      {/* {isLearning && ( */}
        <nav className="py-10 px-5 hidden phone:block phone:px-10 tablet:px-20 bg-slate-700 tablet:mb-10">
          <div className="w-full ">
            {/* Navbar Links (Hidden on phone screens, visible on tablet and above) */}
            <div className="learning grid grid-cols-1 phone:grid-cols-3 ">
              <Link to={'/maths'} className="link">
                Maths
              </Link>
              <Link to={'learning/english'} className="link">
                English
              </Link>
              <Link to={"/recommendations"} className="link">
                Recommendations
              </Link>
            </div>
          </div>
        </nav>
      {/* )} */}
        <div>
            <YearLevels subject={subject} loading={loading} error={error} yearLevels={yearLevels}/>
        </div>
    </div>
  )
}

export default Learning