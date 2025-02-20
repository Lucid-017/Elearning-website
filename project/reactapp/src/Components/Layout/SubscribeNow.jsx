import React from 'react'
import { NavLink,Link } from 'react-router-dom'

const SubscribeNow = () => {
  return (
    <div className='subscribe-container'>
        <h2 className='text-white text-[25px] phone:text-[38px] tablet:text-[42px] tablet:leading-[55px]'>
            Become A Member Today
        </h2>
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-5">
            <div className="details">
                <h3 className='text-white'>Start Learning Today</h3>
                <p className='text-gray-500'>Get access to courses to test and expand your knowledge, and more.</p>
                <Link to={'/pricing'}>
                    <button className='button'>Become a member today</button>
                </Link>
            </div>
            <div className='Login'>
                <p className='text-gray-500'>Already have an account? Sign in to access your dashboard.</p>
                <Link to={'/login'}>
                    <button className='btn'>Login</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default SubscribeNow
