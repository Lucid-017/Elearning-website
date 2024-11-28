import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Newsletter from '../Components/Newsletter'
import Hero from '../assets/Home2.png'
import maths from '../assets/MATHS.SVG'
import english from '../assets/English.svg'
import share from '../assets/share.svg'
import './css/Home.css'
import Grades from '../Components/Layout/Grades'
// import { useAuth } from '../Components/Context/AuthContext'

const Home = () => {

  return (
    <div className='px-10 phone:px-20 Home-comp'>
      <div className="home flex items-center justify-center flex-col tablet:flex-row phone:justify-normal">
        <div className="header flex-1 tablet:w-3/5">
          <code className='text-[#a3c4f5]'>Never stop Learning</code>
          <h2 className='pb-2'>Knowledge Connection
          Open the Door to the Future</h2>
          <p>Giving every student the opportunity to access the best education and open the door to the world of knowledge.
          Start your learning journey today with Edudu to become an outstanding student in our learning community.</p>
          <div className='mt-10 '>
            <button className='rounded bg-[#ff9500]'>Get Started with Us</button>
          </div>
        </div>
        <div className='img flex-1 tablet:w-2/5 flex justify-center'>
          <img className='hidden  tablet:block' src={Hero} alt="" srcset="" />
        </div>
      </div>
      {/*  */}
      <section className='my-10 phone:my-20 '>
          <div className="text-center pb-5">
            <h2 className='pb-2'>Lessons revolve around 2 areas </h2>
            <p>Diverse lessons around 2 subjects: Math and, English to help children improve their comprehensive knowledge</p>
          </div>
          <div className="subject-cards flex flex-col justify-center gap-5 phone:flex-row">
            <div className="subject space-x-2">
              <div className='p-3 bg-[#EFEEFF] rounded-lg'>
                <img src={maths} alt="" srcset="" />
              </div>
              <p>Math</p>
            </div>
            <div className="subject space-x-2">
              <div className='p-3 bg-[#FFECEC] rounded-lg'>
                <img src={english} alt="" srcset="" />
              </div>
              <p>English</p>
            </div>
        </div>
      </section>
      {/*  */}
      <section className='my-10 phone:my-20 grade'>
          <div className="lesson-Header text-center mb-5">
            <h2 className='pb-2'>Qualified lessons for students</h2>
            <p className='phone:w-1/2 mx-auto'>A lesson or class is a structured period of time where learning is intended to occur. 
              It involves one or more students being taught by a teacher or instructor.</p>
          </div>
          <div className="grid grid-cols-1 laptop:grid-cols-4 tablet:grid-cols-3 phone:grid-cols-2 gap-3">
            <Grades icon={'K'} title={'PRE-K'} content={'PRE-K is a foundation Standard that reflects 7 important concepts...'}></Grades>
            <Grades icon={1} title={'Grade One'} content={'Standard 1 is a foundation Standard that reflects 7 important concepts...'}></Grades>
            <Grades icon={2} title={'Grade Two'} content={'Standard 2 builds on the foundations of Standard 1 and includes requirements...'}></Grades>
            <Grades icon={3} title={'Grade Three'} content={'Standard 3 of the Aged Care Quality Standards applies to all services delivering personal...'}></Grades>
            <Grades icon={4} title={'Grade Four'} content={'Standard 4 of the Aged Care Quality Standards focuses on services and supports...'}></Grades>
            <Grades icon={5} title={'Grade Five'} content={'Standard 5 Learning Resources. Learning Resources ensure that the school has the...'}></Grades>
            <Grades icon={6} title={'Grade Six'} content={'Standard 6 requires an organisation to have a system to resolve complaints...'}></Grades>
            <Grades icon={7} title={'Grade Seven'} content={'Standard 7 Blood Management mandates that leaders of health service organisations...'}></Grades>
          </div>
          <div className="text-center mt-5 phone:mt-10">
            <button>See more classes</button>
          </div>
      </section>
      <section className='my-10 phone:my-20 reach-out '>
        <div className="flex space-x-10 items-center justify-center flex-col tablet:flex-row phone:justify-normal">
          <div className='flex-1 w-1/2'>
            <img src={share} alt="" srcset="" />
          </div>
          <div className='flex-1 w-1/2'>
            <h2 className="title pb-2">
            Want to share your
knowledge? Join us
as a Mentor
            </h2>
            <p>High-definition video is video of higher resolution and quality than standard-definition. 
              While there is no standardized meaning for high-definition, generally any video.</p>
              <Link to={'/pricing'}>
              <button className='mt-5'>
                Reach out
              </button>
              </Link>
              
          </div>
        </div>
      </section>
      <Newsletter/>
    </div>
  )
}

export default Home