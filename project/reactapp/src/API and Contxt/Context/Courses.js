import { createContext, useContext, useMemo, useState } from "react";
import apiCall from "../API";

export const CoursesContext = createContext();


export const CoursesProvider = ({children})=>{
    // YEAR
    // const [yearLevels, setYearLevels] = useState([]);
    // TOPIC
    // const [topics, setTopics] = useState([]);

    // GRADE
    // UTIL
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [gradeSelected,setGradeSelected]=useState(false)
    const [timeElapsed, setTimeElapsed] = useState(0);
    const timeArray = useState([])
    
  // convert time to seconds
  const timeFormat = (seconds) => {
    const minute = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    // setTimeElapsed(`${minute}:${remainingSeconds}`)
    return `${String(minute).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };


    const getTopics =async(subject)=>{
        const url = `/api/topics/${subject}/`;
        return await apiCall(url)
    }
    const getYear =async(subject)=>{
        const url = `/api/year-levels/${subject}/`;
        return await apiCall(url)
    }
    const getGradeCourse =async(subject,grade)=>{
        const url = `/api/year-levels/${subject}/${grade}`;
        return await apiCall(url)
    }
       const getQuiz =async(quizId)=>{
        const url = `/api/quizzes/${quizId}/`;
        return await apiCall(url)
    }

    const value = useMemo(()=>( {getTopics,getYear,getGradeCourse,getQuiz,timeFormat,timeElapsed,timeArray,setTimeElapsed,loading,setLoading,error,setError,gradeSelected,setGradeSelected}),[loading,error])
    return(
        <CoursesContext.Provider value={value}>
            {children}
        </CoursesContext.Provider>
    )
}

export const useCourses = ()=> useContext(CoursesContext)
