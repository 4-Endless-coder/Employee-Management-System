import React, { createContext, useState, useEffect } from "react";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setLocalStorage();

    const { employees, admin } = getLocalStorage();
    setUserData({ employees, admin });
  }, []);

  // Function to update employee data in real-time
  const updateEmployeeData = (updatedEmployees) => {
    const { admin } = getLocalStorage();
    setUserData({ employees: updatedEmployees, admin });
  };

  return (
    <AuthContext.Provider value={{ ...userData, updateEmployeeData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;