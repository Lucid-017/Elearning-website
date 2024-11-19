import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // runs when application loads
  useEffect(() => {
    const userInfoString = sessionStorage.getItem('user_info');
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      setUser(userInfo);
      setIsLoggedIn(true);
            // console.log('user is logged in')

    }else{
      // console.log('user is not logged in')
            setUser(null)
      setIsLoggedIn(false)

    }
 
  }, [isLoggedIn]); //anytime user logs out and logs in


  // login to get local storage info
  const authlogin = (userInfo) => {
    setUser(userInfo);
    console.log('global state changed')
    setIsLoggedIn(true);
      };
  // our local storage info is then used to track our logout behaviour as well
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    sessionStorage.removeItem('user_info');
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, authlogin, logout,setIsLoggedIn,setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);