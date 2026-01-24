import React, { useContext, useEffect, useState } from 'react'
import Header from '../../other/Header'
import TaskListNumber from '../../other/TaskListNumber'
import TaskList from '../TaskList/TaskList'
import { AuthContext } from '../../context/AuthProvider'

const EmployeeDashboard = ({data}) => {
  const authData = useContext(AuthContext);
  const [employeeData, setEmployeeData] = useState(data);

  useEffect(() => {
    // Update employee data when context changes
    if (authData && authData.employees) {
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
      if (loggedInUser && loggedInUser.data) {
        // Find the updated employee data
        const updatedEmployee = authData.employees.find(
          emp => emp.email === loggedInUser.data.email
        );
        if (updatedEmployee) {
          setEmployeeData(updatedEmployee);
          // Update localStorage with latest data
          localStorage.setItem('loggedInUser', JSON.stringify({ 
            role: 'employee', 
            data: updatedEmployee 
          }));
        }
      }
    }
  }, [authData]);

  return (
    <div className='p-10 bg-[#1C1C1C] h-screen'>
        <Header data={employeeData} />
        <TaskListNumber data={employeeData} />
        <TaskList data={employeeData} />
    </div>
  )
}

export default EmployeeDashboard