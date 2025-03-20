import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userInfoString = sessionStorage.getItem('user_info');
  const userInfo = JSON.parse(userInfoString);


  // runs when application loads
  useEffect(() => {
    if (userInfoString) {
      setUser(userInfo);
      setIsLoggedIn(true);
    }else{
      setUser(null)
      setIsLoggedIn(false)
    }
  }, [userInfoString]); //anytime user logs out and logs in and if the usrInfostring changes


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
    <AuthContext.Provider value={{ user, isLoggedIn, authlogin, logout,setIsLoggedIn,setUser,userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

// export const useAuth = () => useContext(AuthContext);