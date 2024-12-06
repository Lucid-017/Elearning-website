import React from 'react'
import logo from '../assets/About.svg'
import { useLocation } from 'react-router-dom'
import Newsletter from '../Components/Newsletter'
import founder from '../assets/Founder.svg'

const About = () => {
  const url = useLocation().pathname
  const segments = url.split('/')

  return (
    <div className=" pb-20 px-10 phone:px-20  gap-10">
      <div className="herop">
            <p>Home | <span className='text-[#FF9500] capitalize'>{segments}</span></p>
            <div className="flex flex-col tablet:flex-row items-center justify-around pt-5">
                <h2 className='text-[32px] tablet:text-[45px] font-semibold overflow-hidden'>About us</h2>
                <div>
                    <img src={logo} alt="" srcset="" />
                </div>
            </div>
        </div>
      <section className='my-10 phone:my-20'>
        <div className="flex">
          <h2>Making educational experiences better for everyone.</h2>
          <div className="">
              <p>At Ebedmas Learning, 
                we are dedicated to enhancing education for everyone. We leverage technology in innovative and thoughtful ways to inspire learners' natural curiosity,
                 creativity, and thirst for knowledge.</p>
            </div>
        </div>
      </section>
      <section className='my-10 phone:my-20'>
        <div className="flex">
          <div className='flex-1'>
            <h3 className='pb-2'>Join our team.</h3>
            <div className="pb-2">
              <p>For over 8 years, 
                we've been transforming the lives of students and teachers, yet our mission is far from complete.</p>
            </div>
            <p>Ready to make your mark ?</p>
            <button className='mt-6 text-white bg-[#ff9500]'>View Job Openings</button>
          </div>
          <div className="flex-1 flex justify-center">
            <img src={founder} alt="image of the founder" />
          </div>
        </div>
      </section>
        <Newsletter/>
    </div>
  )
}

export default About