import React from 'react'
// import { Link } from 'react-router-dom'
import './Css/Topics.css'

const Topics = ({topics,subject}) => {
  return (
    <div>
      <div className="hero my-10 text-center">
        <h1>{subject}</h1>
        {subject === 'maths' ? (
 <p>Gain fluency and confidence in maths!
 IXL helps students master essential skills 
at their own pace through fun and interactive questions, built in support and motivating awards.</p>

        ):(
          <p>From phonics and reading comprehension to writing strategies and more, IXL helps learners develop the communication skills needed for success in school, university and career.</p>
        )}
         </div>
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
      {!topics.length && <div className='topic flex justify-between items-center bg-white text-black mb-10 p'>There are no topics at the moment</div>}

    </div>
    </div>
  )
}

export default Topics