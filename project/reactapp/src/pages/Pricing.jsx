import React, { useEffect, useState } from 'react'
import logo from '../assets/pricing2.svg'
import './css/Pricing.css'
import Price from '../Components/Price'
import Newsletter from '../Components/Newsletter'
import {usePaystackPayment} from 'react-paystack'
import axios from 'axios'

const Pricing = () => {
    const [plans,setPlans] =useState([])
    const getPaymentOptions = async()=>{
        try{
            const response = await axios.get('api/get-subscription-plans/')
            setPlans(response.data)
            console.log(response.data)
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getPaymentOptions()
    },[])
  return (
    <div className='px-10 phone:px-20'>
        <div className="herop">
            <p>Home | <span className='text-[#FF9500]'>Pricing</span></p>
            <div className="flex flex-col tablet:flex-row items-center justify-around pt-5">
                <h2 className='text-[32px] tablet:text-[45px] font-semibold overflow-hidden'>Our pre-ready<br/> pricing packages</h2>
                <div>
                    <img src={logo} alt="" srcset="" />
                </div>
            </div>
        </div>
        <section className='my-10 tablet:my-20 text-center'>
            <div className='pb-10'>
                <h2 className='pb-5 font-bold normal-case'>
                We create a monthly pricing package <br/> for all standard students
                </h2>
                <div className='pricing-desc' >
                    <p>Basically we create this package for those who are really interested and get benifited from our courses or books. 
                        We want to make a low cost package for them. So that they can purchase any courses with the package they buy from us.
                        Also will get free books from every packages.</p>
                </div>
            </div>

            <div className="pricing">
            <div className="grid grid-cols-1 phone:grid-cols-2 laptop:grid-cols-3 gap-4 justify-center p-4">
                {plans.map(plan=>(
                    <Price pricingName={plan.name} price={plan.price} slug={plan.slug}/>
                ))}
            </div>
        </div>
        </section>
        
       <Newsletter/>
    </div>
  )
}

export default Pricing