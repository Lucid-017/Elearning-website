import React, { useState, useEffect} from 'react'


const Dashboard = () => {
  const [user,setUser] = useState('')

  // Find another way to access username, local storage is only dependent on if user uses the remember me option
  useEffect(()=>{
    const username = localStorage.getItem('username')
    setUser(username)
  },[])
  
  return (
    <div>Hello {user}</div>
  )
}

export default Dashboard