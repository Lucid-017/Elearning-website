import React, { useEffect, useState } from 'react'

const ErrorHandling = ({message,type,show,onClose}) => {
    const [visible, setVisible] = useState(show)

    // hide after 4 seconds
    useEffect(()=>{
        setVisible(true)
        const timer = setTimeout(()=>{
            setVisible(false)
         if(onClose) onClose() //auto close after timer
        },4000)
    return ()=>{
        clearTimeout(timer)
    }
    },[show,onClose])

    if(!visible) return null

    // classes based on errors
    let notifyStyle ='';
    if(type ==='success'){
       notifyStyle = 'bg-green-500 text-white'
    }
    else if (type === 'error'){
      notifyStyle = 'bg-red-500 text-white'
    }
    else if (type === 'info'){
      notifyStyle = 'bg-slate-200 text-white'
    }

  return (
    <div className={`fixed top-32 right-5  max-w-xs w-full p-4 rounded-md shadow-md transition-transform transform ease-in-out duration-300 ${notifyStyle}`}>
      <div className="flex justify-between items-center">
        <span className='text-white'>{message}</span>
        <button
          onClick={() => {
            setVisible(false);
            if (onClose) onClose();
          }}
          className="ml-4 text-lg font-bold"
        >
          ×
        </button>
      </div>
    </div>
  )
}
export default ErrorHandling
