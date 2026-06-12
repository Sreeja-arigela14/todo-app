// src/context/AuthContext.jsx

import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(
    localStorage.getItem("access")
  );

  const login = (access) => {
    localStorage.setItem("access", access);
    setToken(access);
  };

  const logout = () => {
    localStorage.removeItem("access");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};