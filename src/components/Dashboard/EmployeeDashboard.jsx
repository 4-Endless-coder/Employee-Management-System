import React, { useContext, useEffect, useState } from 'react';
import Header from '../../other/Header';
import TaskListNumber from '../../other/TaskListNumber';
import TaskList from '../TaskList/TaskList';
import { AuthContext } from '../../context/AuthProvider';

const EmployeeDashboard = ({ changeUser, data }) => {
  const authData = useContext(AuthContext);
  const [employeeData, setEmployeeData] = useState(data);

  useEffect(() => {
    // Set initial data
    if (data) {
      setEmployeeData(data);
    }
  }, [data]);

  useEffect(() => {
    // Update employee data when context changes (real-time updates!)
    if (authData && authData.employees && employeeData) {
      const updatedEmployee = authData.employees.find(
        emp => emp.email === employeeData.email
      );
      if (updatedEmployee) {
        setEmployeeData(updatedEmployee);
        // Also update localStorage to keep it in sync
        localStorage.setItem('loggedInUser', JSON.stringify({ 
          role: 'employee', 
          data: updatedEmployee 
        }));
      }
    }
  }, [authData?.employees, employeeData?.email]);

  // Show loading state while data is being fetched
  if (!employeeData) {
    return (
      <div className='p-10 bg-[#1C1C1C] h-screen flex items-center justify-center'>
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent mx-auto"></div>
          <p className="text-gray-400 text-xl">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='p-10 bg-[#1C1C1C] h-screen overflow-auto'>
      <Header changeUser={changeUser} data={employeeData} />
      <TaskListNumber data={employeeData} />
      <TaskList data={employeeData} />
    </div>
  );
};

export default EmployeeDashboard;