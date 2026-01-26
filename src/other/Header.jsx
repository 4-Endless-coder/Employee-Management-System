import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = (props) => {
  const [username, setUsername] = useState('');
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if employee data is provided
    if (props.data) {
      setUsername(props.data.firstName);
      setUserRole('Employee');
    } 
    // Check if admin data is provided
    else if (props.adminData) {
      setUsername(props.adminData.firstName);
      setUserRole('Admin');
    }
    // Fallback: try to get from localStorage
    else {
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
      
      if (loggedInUser && loggedInUser.data) {
        setUsername(loggedInUser.data.firstName);
        setUserRole(loggedInUser.role === 'admin' ? 'Admin' : 'Employee');
      } else {
        // Final fallback: check admin in localStorage
        const adminData = JSON.parse(localStorage.getItem('admin'));
        if (adminData && adminData.length > 0) {
          setUsername(adminData[0].firstName);
          setUserRole('Admin');
        }
      }
    }
  }, [props.data, props.adminData]);

  const logOutUser = () => {
    // Clear logged in user from localStorage
    localStorage.setItem('loggedInUser', '');
    
    // Call changeUser prop to reset app state
    if (props.changeUser) {
      props.changeUser(null);
    }
    
    // Navigate to login page (SPA way - no reload!)
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 border-white/20 bg-white/10 shadow-lg backdrop-blur-sm">
          <span className="text-2xl font-bold text-white">
            {username ? username.charAt(0).toUpperCase() : 'U'}
          </span>
        </div>

        <div className="flex flex-col">
          <h1 className="mb-1 text-xs font-medium tracking-wider text-white/70 uppercase">
            Welcome Back
          </h1>

          <div className="flex items-center gap-3">
            <h2 className="text-2xl leading-none font-bold text-white">
              {username || 'User'}
            </h2>

            <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-white backdrop-blur-sm">
              {userRole || 'User'}
            </span>
          </div>
        </div>
      </div>

      <button 
        onClick={logOutUser} 
        className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:bg-red-700 active:scale-95"
      >
        Log Out
      </button>
    </div>
  );
};

export default Header;