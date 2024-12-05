import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";

const Complete = ({time,smartScore,score,grade,subject}) => {
    const navigate = useNavigate();

    const handleGoback=()=>{
        navigate(-1)
    }
  return (
    <div>
        <div className="text-center">
            <h2 className='text-[#FF9500] pb-2'>Woohoo!</h2>
            <p>You have completed this course and mastered the skill</p>
            <p>Learn more <span className='text-[#5995ed]' onClick={handleGoback}>Keep practicing</span></p>
        </div>
        <div className="my-10 flex flex-col space-y-5 phone:flex-row phone:space-x-10 justify-center">
            <div className="timeSpent flex items-center gap-x-5 justify-center">
                <FontAwesomeIcon className="icon text-[#00FF00]" icon={icons.faClock}/>
                <div>
                    <p>Time Spent</p>
                    <p>{time}</p>
                </div>
            </div>
            <div className="timeSpent flex items-center gap-x-5 justify-center">
                <FontAwesomeIcon className="icon text-[#5995ed]" icon={icons.faLightbulb}/>
                <div>
                    <p>Smart Score</p>
                    <p>{smartScore}</p>
                </div>
            </div>
            <div className="timeSpent flex items-center gap-x-5 justify-center">
                <FontAwesomeIcon className="icon text-[#FF9500]" icon={icons.faCheck}/>
                <div>
                    <p>Questions Answered</p>
                    <p>{score}</p>
                </div>
            </div>
        </div>
        <div className="explore mt-10 flex justify-center">
            <div className="grid grid-cols-1 phone:grid-cols-3">
                {/* map through random 5 courses */}
            </div>

            <p  onClick={handleGoback} className='text-[#5995ed] flex items-center' > <FontAwesomeIcon className="icon" icon={icons.faArrowLeftLong}/>Back to all {grade} skills</p>
      
        </div>
    </div>
  )
}

export default Complete