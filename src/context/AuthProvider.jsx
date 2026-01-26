import React, { createContext, useState, useEffect } from "react";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Initialize localStorage if empty
    const existingEmployees = localStorage.getItem('employees');
    const existingAdmin = localStorage.getItem('admin');
    
    if (!existingEmployees || !existingAdmin) {
      console.log("Initializing localStorage with default data...");
      setLocalStorage();
    }

    // Load data from localStorage
    const { employees, admin } = getLocalStorage();
    
    if (employees && admin) {
      setUserData({ employees, admin });
      console.log("Data loaded successfully:", { 
        employeeCount: employees.length, 
        adminCount: admin.length 
      });
    } else {
      console.error("Failed to load data from localStorage");
    }
  }, []);

  // Function to update employee data in real-time
  const updateEmployeeData = (updatedEmployees) => {
    console.log("Updating employee data...");
    
    // Update localStorage first
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    
    // Then update context state
    const { admin } = getLocalStorage();
    setUserData({ employees: updatedEmployees, admin });
    
    console.log("Employee data updated successfully");
  };

  return (
    <AuthContext.Provider value={{ ...userData, updateEmployeeData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;