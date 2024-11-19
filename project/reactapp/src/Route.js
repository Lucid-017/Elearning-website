import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children})=>{
      // confirm if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isAuthenticated =sessionStorage.getItem('user_info')

  // runs when application loads
  useEffect(() => {
    const userInfoString = sessionStorage.getItem('user_info');
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      // setUser(userInfo);
      setIsLoggedIn(true);
            console.log('user is logged in')

    }else{
      console.log('user is not logged in')
            // setUser(null)
      setIsLoggedIn(false)

    }
 
  }, [isLoggedIn]); //anytime user logs out and logs in

    // route guard
    return isAuthenticated ? children : <Navigate to={'/login'}/>
}

export default ProtectedRoute

// const ProtectedRoute = ({children})=>{
//     const isAuthenticated =localStorage.getItem('user_info')
//     return isAuthenticated ? children : <Navigate to={'/login'}/>
//   }