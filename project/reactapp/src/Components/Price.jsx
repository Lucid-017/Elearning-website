import React from 'react'
import priceIcon from '../assets/price icon.png'

const Price = ({price,pricingName,discount}) => {
  return (
      <div className="pricing-card text-start">
                    <div className="header">
                        <img src={priceIcon} alt="" srcset="" />
                        <p className='font-semibold py-2'>{pricingName}</p>
                    </div>
                    <div className="price">
                    <small className='text-[#5D5A6F]'>₦{discount}/Monthly</small>
                        <p>₦{price}.00</p>
                        <button>Subscribe</button>
                    </div>
                </div>
  )
}

export default Price