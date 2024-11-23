import React, { useContext, useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import './Css/Topics.css'
import { useNavigate, useParams } from 'react-router-dom';
import { CoursesContext } from '../../API and Contxt/Context/Courses';
import { useToast } from '../../API and Contxt/Context/ToastContext';

const Topics = () => {
  const navigate = useNavigate();
  const { subject } = useParams(); // Extract the 'subject' slug from the URL
  const [topics, setTopics] = useState([]);
  const {getTopics,setLoading,setError,error,loading} =useContext(CoursesContext)
  const { showToast } = useToast();


  const fetchTopics = async () => {

    try {
      setLoading(true);
      const response = await getTopics(subject) //default redirect on initial render
      setTopics(response);
      console.log(response, "TOPIC DATA");
    } catch (error) {
      setError("Failed to load year levels");
      console.error("Error fetching year levels:", error.message);
      showToast(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    setTopics([]);
    fetchTopics();
    // navigate(`topic/${subject}`)

  },[subject])
  
  return (
    <div>
      {/* <div className="my-10 text-center">
        <h1>{subject}</h1>
         </div> */}
    <div className="">
      {topics.map((topic,index)=>(
        <div className='topic flex justify-between items-center bg-white mb-10'>
          <div className='w-1/2'>
          <h3 className="title pb-2">{topic.name}</h3>
          {/* render 3 dynamic sample topics here */}
          
          <p><small className='text-slate-600 pr-2'>Some Topics Includes:</small>{topic.skills.map(skill=> skill.name).join(' | ')}.</p>
          </div>
          <div>
            <button>see all {topic.total_skills} topics</button>
          </div>
        </div>
      ))}
      {/* if topic is empty */}
      {!topics.length && <div className='topic flex justify-between items-center bg-white mb-10'>There are no topics at the moment</div>}

    </div>
    </div>
  )
}

export default Topics