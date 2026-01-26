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

  // Function to update employee data in real-time (NO RELOAD!)
  const updateEmployeeData = (updatedEmployees) => {
    console.log("Updating employee data...");
    
    // Update localStorage first
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    
    // Then update context state (triggers re-render)
    const { admin } = getLocalStorage();
    setUserData({ employees: updatedEmployees, admin });
    
    // Update logged in user if they're an employee
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      try {
        const parsed = JSON.parse(loggedInUser);
        if (parsed.role === 'employee') {
          const updatedUser = updatedEmployees.find(
            emp => emp.email === parsed.data.email
          );
          if (updatedUser) {
            localStorage.setItem('loggedInUser', JSON.stringify({
              role: 'employee',
              data: updatedUser
            }));
          }
        }
      } catch (error) {
        console.error("Error updating logged in user:", error);
      }
    }
    
    console.log("Employee data updated successfully - UI will refresh automatically!");
  };

  return (
    <AuthContext.Provider value={{ ...userData, updateEmployeeData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;