import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
    
  // Check if we're on the client side before accessing localStorage
  const token = typeof window !== 'undefined' ? localStorage?.getItem('token') : null;

  // Decode the token and pass it to the required components
  const decodedToken = token != null ? jwtDecode(token) : null;

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (decodedToken) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [decodedToken]);

  const logIn = () => {
    setLoggedIn(true);
  };

  const logOut = () => {
    setLoggedIn(false);
    decodedToken && 
        localStorage.clear();
  };

  const user = {
    isLoggedIn: loggedIn,
    logIn: logIn,
    logOut: logOut,
    data: decodedToken && decodedToken,
  };

  return (
    <SessionContext.Provider value={{ user }}>
      {children}
    </SessionContext.Provider>
  );
};

export const userSession = () => {
  return useContext(SessionContext);
};
