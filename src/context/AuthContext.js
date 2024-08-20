import React, { createContext, useState, useContext } from 'react';

// Create a context to hold the authentication state and related functions
const AuthContext = createContext();

// Create an AuthProvider component to wrap your app and provide the context value
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated'));
  const [tempuser,setTempuser] = useState(localStorage.getItem('username'));
  const [roles, setRoles] = useState(JSON.parse(localStorage.getItem('roles')) || []);
  
  const toggleAuth = () => {
    setIsAuthenticated((prevAuth) => !prevAuth);
  };

  const toggleTempuser = (tempname) => {
    setTempuser(tempname);
  }

  const setRolesToLocalStorage = (roles) => {
    localStorage.setItem('roles', JSON.stringify(roles));
    setRoles(roles);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        toggleAuth,
        tempuser,
        toggleTempuser,
        roles,
        setRoles: setRolesToLocalStorage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext value in components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
