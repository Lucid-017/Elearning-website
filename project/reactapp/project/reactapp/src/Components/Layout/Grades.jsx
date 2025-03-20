import React from 'react'
import { Link } from 'react-router-dom'
import './css/Grades.css'

const Grades = ({color,icon,title,content}) => {
    // if user is logged in then route them to course
    const session = sessionStorage.getItem('user-info')
  return (
    <div className='bg-white rounded-lg p-5 grades'>
        <div className="head pb-2">
            <div className={`p-2 rounded-full inline-block bg-[#5995ed]`}>
                <p className='text-[25px] text-white font-extrabold'>{icon}</p>
            </div>
            <p className='font-semibold text-[25px]'>{title}</p>
        </div>
        <div className="Grades-content pb-4">
            <p className='text-[14px]'>{content}</p>
        </div>
        <div>
            <Link to={session ? 'learning' : '/pricing'}>
            <button>Go to class</button>
            </Link>
        </div>
    </div>
  )
}

export default Grades