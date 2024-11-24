import React from 'react'
import logo from '../assets/pricing.png'
import './css/Pricing.css'

const Pricing = () => {
    const monthly = 9900
  return (
    <div className='px-20'>
        <div className="herop">
            <p>Home | <span>Pricing</span></p>
            <div className="flex justify-around pt-5">
                <h2>Our pre-ready<br/> pricing packages</h2>
                <div>
                    <img src={logo} alt="" srcset="" />
                </div>
            </div>
        </div>
        <section className='my-20 text-center'>
            <h2 className='pb-5'>
             We create a monthly pricing package <br/> for all standard students
            </h2>
            <div >
                <p>Basically we create this package for those who are really interested and get benifited from our courses or books. 
                    We want to make a low cost package for them. So that they can purchase any courses with the package they buy from us.
                     Also will get free books from every packages.</p>
            </div>
        </section>
        <section className="pricing">
            <div className="flex justify-around">
                <div className="pricing-card">
                    <div className="header">
                        {/* icon */}
                        Monthly Subscription
                    </div>
                    <div className="price">
                        <p>{monthly}.00</p>
                        <button>Subscribe</button>
                    </div>
                </div>
                <div className="pricing-card">
                    <div className="header">
                        {/* icon */}
                        Yearly Subscription
                    </div>
                    <div className="price">
                        <p>{monthly * 12 - 79000/12}</p>
                        <p>79,900.00</p>
                        <button>Subscribe</button>
                    </div>
                </div>
            </div>
        </section>
        <section className="newsletter my-20">
            <div>
                <div className="header pb-5">
                    <h3>
                    Subscribe to Get Update On 
                    </h3>
                    <h3>
                    Every New Course
                    </h3>
                    <small>20k+ students daily learn with Eduvi. Subscribe for new courses.</small>
                </div>
                <div>
                <input type="email" />
                <button>Subscribe</button>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Pricing