import React, { useContext, useEffect, useState } from "react";
import Login from "./components/Auth/Login";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import { AuthContext } from "./context/AuthProvider";

const App = () => {
  const [user, setUser] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  
  // Access the centralized data
  const authData = useContext(AuthContext);

  useEffect(() => {
    // Check if a user is already logged in (persists on refresh)
    const loggedInUser = localStorage.getItem('loggedInUser');
    
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser.role);
      setLoggedInUserData(foundUser.data);
    }
  }, []);

  // Update logged-in employee data when context changes
  useEffect(() => {
    if (user === 'employee' && authData && authData.employees && loggedInUserData) {
      const updatedEmployee = authData.employees.find(
        emp => emp.email === loggedInUserData.email
      );
      if (updatedEmployee) {
        setLoggedInUserData(updatedEmployee);
      }
    }
  }, [authData, user]);

  const handleLogin = (email, password) => {
    // Guard clause: wait for authData to load
    if (!authData) {
        alert("System initializing. Please try again.");
        return;
    }

    const { admin, employees } = authData;

    // 1. Find Admin
    const adminUser = admin.find((a) => a.email == email && a.password == password);

    // 2. Find Employee
    const employeeUser = employees.find((e) => e.email == email && e.password == password);

    if (adminUser) {
      setUser("admin");
      setLoggedInUserData(adminUser);
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin', data: adminUser }));
    } 
    else if (employeeUser) {
      setUser("employee");
      setLoggedInUserData(employeeUser);
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee', data: employeeUser }));
    } 
    else {
      alert("Invalid Credentials");
    }
  };

  return (
    <>
      {!user ? <Login handleLogin={handleLogin} /> : ""}
      {user == "admin" ? <AdminDashboard changeUser={setUser} /> : (user == 'employee' ? <EmployeeDashboard changeUser={setUser} data={loggedInUserData} /> : null) }
    </>
  );
};

export default App;