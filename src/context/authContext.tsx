import React, { createContext, useState } from 'react';
import { getCookie } from '../services/cookieService';
export const AuthContext = createContext<AuthContextType>(null);

export const AuthProvider = props => {
  const [authorized, setAuthorized] = useState(!!getCookie('jwt'));
  const [authToken, setAuthToken] = useState(getCookie('jwt'));
  const [loginFormVisible, setLoginFormVisible] = useState(false);

  return (
    <AuthContext.Provider value={{ authorized, setAuthorized, authToken, setAuthToken, loginFormVisible, setLoginFormVisible }}>
      {props.children}
    </AuthContext.Provider>
  )
}