import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import { AuthContext } from "./context/AuthProvider";

const App = () => {
  const [user, setUser] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const authData = useContext(AuthContext);

  useEffect(() => {
    // Check if a user is already logged in
    const loggedInUser = localStorage.getItem('loggedInUser');
    
    if (loggedInUser) {
      try {
        const foundUser = JSON.parse(loggedInUser);
        if (foundUser && foundUser.role && foundUser.data) {
          setUser(foundUser.role);
          setLoggedInUserData(foundUser.data);
        }
      } catch (error) {
        console.error("Error parsing logged in user:", error);
        localStorage.removeItem('loggedInUser');
      }
    }
    setIsLoading(false);
  }, []);

  // Update logged-in employee data when context changes
  useEffect(() => {
    if (user === 'employee' && authData && authData.employees && loggedInUserData) {
      const updatedEmployee = authData.employees.find(
        emp => emp.email === loggedInUserData.email
      );
      if (updatedEmployee) {
        setLoggedInUserData(updatedEmployee);
        localStorage.setItem('loggedInUser', JSON.stringify({ 
          role: 'employee', 
          data: updatedEmployee 
        }));
      }
    }
  }, [authData?.employees, user, loggedInUserData?.email]);

  const handleLogin = (email, password) => {
    if (!authData) {
      alert("System initializing. Please try again.");
      return;
    }

    const { admin, employees } = authData;

    if (!admin || !employees) {
      alert("System data not loaded. Please refresh the page.");
      return;
    }

    const adminUser = admin.find((a) => a.email === email && a.password === password);
    const employeeUser = employees.find((e) => e.email === email && e.password === password);

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

  const handleLogout = () => {
    setUser(null);
    setLoggedInUserData(null);
    localStorage.setItem('loggedInUser', '');
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#1C1C1C]">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent mx-auto"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Login Route */}
        <Route 
          path="/login" 
          element={
            user ? (
              <Navigate to={user === 'admin' ? '/admin' : '/employee'} replace />
            ) : (
              <Login handleLogin={handleLogin} />
            )
          } 
        />

        {/* Admin Dashboard Route */}
        <Route 
          path="/admin" 
          element={
            user === 'admin' ? (
              <AdminDashboard 
                changeUser={handleLogout} 
                data={loggedInUserData}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />

        {/* Employee Dashboard Route */}
        <Route 
          path="/employee" 
          element={
            user === 'employee' ? (
              <EmployeeDashboard 
                changeUser={handleLogout} 
                data={loggedInUserData}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />

        {/* Default Route */}
        <Route 
          path="/" 
          element={
            <Navigate 
              to={
                user === 'admin' 
                  ? '/admin' 
                  : user === 'employee' 
                    ? '/employee' 
                    : '/login'
              } 
              replace 
            />
          } 
        />

        {/* 404 Route */}
        <Route 
          path="*" 
          element={<Navigate to="/" replace />} 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;