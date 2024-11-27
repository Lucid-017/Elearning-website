import React from 'react'

const Newsletter = () => {
  return (
    <section className="newsletter mt-20">
    <div className=' p-5'>
        <div className="header pb-5">
        {/* font-size: 42px;
        font-weight: 700; */}
            <h2 className='text-white text-[25px] phone:text-[38px] tablet:text-[42px] tablet:leading-[55px]'>
            Subscribe to Get Update On <br/> Every New Course
            </h2>
            <small>20k+ students daily learn with Eduvi. Subscribe for new courses.</small>
        </div>
        <div className='flex justify-center'>
            <input className='w-[100px] phone:w-[509px]' type="email" placeholder='enter your email'/>
            <button>Subscribe</button>
        </div>
    </div>
</section>
  )
}

export default Newsletter