import React, { createContext, useState } from 'react';
export const AuthContext = createContext<AuthContextType>(null);

export const AuthProvider = props => {
  const [authorized, setAuthorized] = useState(true);
  const [authToken, setAuthToken] = useState(null);
  const [loginFormVisible, setLoginFormVisible] = useState(false);

  return (
    <AuthContext.Provider value={{ authorized, setAuthorized, authToken, setAuthToken, loginFormVisible, setLoginFormVisible }}>
      {props.children}
    </AuthContext.Provider>
  )
}