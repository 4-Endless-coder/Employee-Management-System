import React, { useContext, useEffect, useState } from 'react'
import Header from '../../other/Header'
import TaskListNumber from '../../other/TaskListNumber'
import TaskList from '../TaskList/TaskList'
import { AuthContext } from '../../context/AuthProvider'

const EmployeeDashboard = ({ changeUser }) => {
  const authData = useContext(AuthContext);
  const [employeeData, setEmployeeData] = useState(null);

  useEffect(() => {
    // Get initial employee data from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser && loggedInUser.data) {
      setEmployeeData(loggedInUser.data);
    }
  }, []);

  useEffect(() => {
    // Update employee data when context changes (when tasks are updated)
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
  }, [authData, employeeData?.email]);

  // Show loading state while data is being fetched
  if (!employeeData) {
    return (
      <div className='p-10 bg-[#1C1C1C] h-screen flex items-center justify-center'>
        <p className="text-gray-400 text-xl">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className='p-10 bg-[#1C1C1C] h-screen'>
      <Header changeUser={changeUser} data={employeeData} />
      <TaskListNumber data={employeeData} />
      <TaskList data={employeeData} />
    </div>
  )
}

export default EmployeeDashboard