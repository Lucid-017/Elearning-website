import React, { useState, useEffect} from 'react'


const Dashboard = () => {
  const [user,setUser] = useState('')

  useEffect(()=>{
    const username = localStorage.getItem('username')
    setUser(username)
  },[])
  
  return (
    <div>Hello {user}</div>
  )
}

export default Dashboard