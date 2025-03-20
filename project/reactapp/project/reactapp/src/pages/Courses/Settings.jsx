import React, { useContext, useState } from 'react'
import { AuthContext } from '../../API and Contxt/Context/AuthContext'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import icon1 from '../../assets/profile/adult-male.png'
import icon2 from '../../assets/profile/boat.png'
import icon3 from '../../assets/profile/boy.png'
import icon4 from '../../assets/profile//cat.png'
import icon5 from '../../assets/profile/crown.png'
import icon6 from '../../assets/profile/fish.png'
import icon7 from '../../assets/profile/flower.png'
import icon8 from '../../assets/profile/girl.png'
import './Css/Setting.css'
import { useLocation } from 'react-router-dom';
import logo from '../../assets/contact.svg'


const Settings = () => {
    const {userInfo} = useContext(AuthContext)
    const [username,setUsername] = useState(userInfo?.username || 'guest')
    const [selectedIcon,setSelectedIcon] =useState(0)
    const url = useLocation().pathname
    const segments = url.split('/')

    const profileIcon =[
        {  image:icon1},
        {  image:icon2},
        {  image:icon3},
        {  image:icon4},
        {  image:icon5},
        {  image:icon6},
        {  image:icon7},
        {  image:icon8

        },
    ]

    const handleUsernameChange=(e)=>{
        setUsername(e.target.value)
    }

    const handleIconNavigation =(direction)=>{
        setSelectedIcon((prev)=> direction === 'next'? (prev+1)%profileIcon.length:(prev-1 +profileIcon.length)%profileIcon.length)
    }
  return (
    <div className='px-10 phone:px-20 my-10'>
        <div className="herop">
            <p>Home | <span className='text-[#FF9500] capitalize'>{segments}</span></p>
            <div className="flex flex-col tablet:flex-row items-center justify-around pt-5">
                <h2 className='text-[32px] tablet:text-[45px] font-semibold overflow-hidden'>Profile & Settings</h2>
                <div>
                    <img src={logo} alt="" srcset="" />
                </div>
            </div>
        </div>
        <div className="header mb-10">
            <p>You're currently signed in as {userInfo.username || 'guest'} </p>
        </div>
        <div className="form shadow-md m-1">
            <div className="iconArea flex items-center p-4 bg-[#ff9500] space-x-2">
                <FontAwesomeIcon className="icon text-[#0c0c0b]" icon={icons.faUserAstronaut}/>
                <p>Edit Profile</p>
            </div>
            <div className="inputs p-5">
                <div className="input mb-4">
                    <label htmlFor="username">Username</label>
                    <input className='block' type="text" value={username} onChange={handleUsernameChange} placeholder='Edit username'/>
                </div>
                <div>
                    <p className='pb-2'>Profile Icon</p>
                    {/* mobile */}
                    <div className="icon flex items-center block phone:hidden">
                    <button className='pr-2' onClick={()=>handleIconNavigation("prev")} aria-hidden="true" disabled={selectedIcon===0}><FontAwesomeIcon className="icon text-[#0c0c0b]" icon={icons.faArrowLeft}/></button>
                        <img className=' active w-14 rounded-full' src={profileIcon[selectedIcon]?.image} alt="" srcset="" />
                    <button className='pl-2' onClick={()=>handleIconNavigation("next")} aria-hidden="true"  disabled={selectedIcon === profileIcon.length-1}><FontAwesomeIcon className="icon text-[#0c0c0b]" icon={icons.faArrowRight}/></button>

                    </div>
                    {/* bigger screens */}
                    <div className="icon-list-container hidden phone:block collapsed rounded">
                        <div className="flex my-4 mx-2">
                            <button className='pr-4' onClick={()=>handleIconNavigation("prev")} aria-hidden="true" disabled={selectedIcon===0}><FontAwesomeIcon className="icon text-[#0c0c0b]" icon={icons.faArrowLeft}/></button>
                                <ul className="icon-list active flex flex-wrap space-x-4 items-center">
                                    {profileIcon.map((icon,index)=>(
                                        <li key={index} aria-selected="true" 
                                        role='option'
                                        onClick={()=> setSelectedIcon(index)}
                                        >
                                            <div className={`icon-box ${selectedIcon === index ? 'selected':''}`}>
                                                <img className='inline w-12 rounded-full' src={icon.image} alt={`profile icon ${index +1}`} />
                                            </div>
                                        </li>
                                    ))}

                                </ul>
                            <button className='pl-4' onClick={()=>handleIconNavigation("next")} aria-hidden="true"  disabled={selectedIcon === profileIcon.length-1}><FontAwesomeIcon className="icon text-[#0c0c0b]" icon={icons.faArrowRight}/></button>
                        </div>
                        
                    </div>
                </div>
                {/* handle save settings */}
                <button className='btn mt-5 bg-[#ff9500] text-white px-10 py-2 rounded hover:bg-[#e08300]'>Save</button>
            </div>
        </div>
    </div>
  )
}

export default Settings