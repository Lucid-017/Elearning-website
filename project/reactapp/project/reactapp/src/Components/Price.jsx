import React from 'react'
import priceIcon from '../assets/priceIcon.svg'

const Price = ({price,pricingName,discount}) => {
  return (
      <div className="pricing-card text-start">
                    <div className="header">
                        <img src={priceIcon} alt="" srcset="" />
                        <p className='font-semibold text-[30px] py-2'>{pricingName}</p>
                    </div>
                    <div className="price">
                    <p className='text-[#ff9500] '><span className='text-[20px]'>₦</span>{discount}/Monthly</p>
                        <p className='text-[30px] font-semibold pb-2'><span className='text-[20px]'>₦</span>{price}</p>
                        <button>Enroll</button>
                    </div>
      </div>
  )
  
}

export default Price