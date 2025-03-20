import React, { useContext } from 'react'
import { AuthContext } from '../API and Contxt/Context/AuthContext'
import priceIcon from '../assets/priceIcon.svg'
import axios from 'axios'
const Price = ({price,pricingName,slug}) => {
    const {userInfo} = useContext(AuthContext);
      const accessToken = userInfo.access_token;

    const handleInitiatePayment = async () => {
        try {
          const response = await axios.post(`http://127.0.0.1:8000/api/subscription/initiate-payment/${slug}/`, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ price }),
          });
        //   const data = await response.json();
        console.log(accessToken)
    
          if (response.payment_url) {
            // Redirect the user to the Paystack authorization URL
            window.location.href = response.payment_url;
            // Optionally, call onPaymentInitiated callback
            // onPaymentInitiated();
          } else {
            console.error("Error initiating payment:", response.error);
          }
        } catch (error) {
          console.error("Network error:", error);
        }
      };
    
  return (
      <div className="pricing-card text-start">
                    <div className="header">
                        <img src={priceIcon} alt="" srcset="" />
                        <p className='font-semibold text-[30px] py-2'>{pricingName}</p>
                    </div>
                    <div className="price">
                    <p className='text-[#ff9500] '><span className='text-[20px]'>₦</span>/Monthly</p>
                        <p className='text-[30px] font-semibold pb-2'><span className='text-[20px]'>₦</span>{price}</p>
                        <button onClick={handleInitiatePayment}>Enroll</button>
                    </div>
      </div>
  )
  
}

export default Price