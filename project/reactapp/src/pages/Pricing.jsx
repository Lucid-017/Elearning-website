import React from 'react'
import logo from '../assets/pricing.png'
import './css/Pricing.css'
import Price from '../Components/Price'

const Pricing = () => {
    const monthly = 9900
  return (
    <div className='px-10 phone:px-20'>
        <div className="herop">
            <p>Home | <span>Pricing</span></p>
            <div className="flex flex-col tablet:flex-row items-center justify-around pt-5">
                <h2>Our pre-ready<br/> pricing packages</h2>
                <div>
                    <img src={logo} alt="" srcset="" />
                </div>
            </div>
        </div>
        <section className='my-10 tablet:my-20 text-center'>
            <div className='pb-10'>
                <h2 className='pb-5'>
                We create a monthly pricing package <br/> for all standard students
                </h2>
                <div >
                    <p>Basically we create this package for those who are really interested and get benifited from our courses or books. 
                        We want to make a low cost package for them. So that they can purchase any courses with the package they buy from us.
                        Also will get free books from every packages.</p>
                </div>
            </div>

            <div className="pricing">
            <div className="flex flex-col phone:flex-row gap-4 justify-center">
                <Price pricingName={'Monthly Subscription'} price={9000} />
                <Price pricingName={'Yearly Subscription'} price={79900} discount={6658.33}/>
            </div>
        </div>
        </section>
        
        <section className="newsletter mt-20">
            <div className=' p-5'>
                <div className="header pb-5">
                {/* font-size: 42px;
                font-weight: 700; */}
                    <h2 className='text-[25px] phone:text-[38px] tablet:text-[42px] tablet:leading-[55px]'>
                    Subscribe to Get Update On <br/> Every New Course
                    </h2>
                    <small>20k+ students daily learn with Eduvi. Subscribe for new courses.</small>
                </div>
                <div className='flex'>
                    <input className='w-[100px] phone:w-[509px]' type="email" placeholder='enter your email'/>
                    <button>Subscribe</button>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Pricing