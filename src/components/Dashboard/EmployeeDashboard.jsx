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
        (emp) => emp.email === employeeData.email,
      );
      if (updatedEmployee) {
        setEmployeeData(updatedEmployee);
        // Also update localStorage to keep it in sync
        localStorage.setItem(
          'loggedInUser',
          JSON.stringify({
            role: 'employee',
            data: updatedEmployee,
          }),
        );
      }
    }
  }, [authData?.employees, employeeData?.email]);

  // Show loading state while data is being fetched
  if (!employeeData) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#020617]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
          <p className="text-xl text-gray-400">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-auto bg-[#020617]">
      {/* Atmospheric glows (pure CSS – no re-renders) */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-32 -left-24 h-80 w-80 rounded-full bg-sky-500/25 blur-3xl md:h-[22rem] md:w-[22rem]" />
        <div className="absolute bottom-[-6rem] right-[-4rem] h-96 w-96 rounded-full bg-violet-500/25 blur-[90px] md:h-[26rem] md:w-[26rem]" />
      </div>

      {/* Main content */}
      <div className="relative z-10 px-4 py-6 sm:px-6 md:px-8 lg:px-10 lg:py-8 space-y-8">
        <Header changeUser={changeUser} data={employeeData} />

        {/* Bento grid: vitals + scroller */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5 xl:col-span-4">
            <TaskListNumber data={employeeData} />
          </div>
          <div className="lg:col-span-7 xl:col-span-8">
            <TaskList data={employeeData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;