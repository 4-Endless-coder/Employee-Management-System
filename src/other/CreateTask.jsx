import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";

const CreateTask = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [category, setCategory] = useState("");

  const { updateEmployeeData } = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();

    // Create new task object
    const newTask = {
      taskTitle,
      taskDescription,
      taskDate,
      category,
      active: false,
      newTask: true,
      completed: false,
      failed: false,
    };

    // Get employees from localStorage
    const employees = JSON.parse(localStorage.getItem("employees")) || [];

    // Find the employee to assign task to
    let taskAssigned = false;
    const updatedEmployees = employees.map((employee) => {
      if (employee.firstName.toLowerCase() === assignTo.toLowerCase() || 
          employee.email.toLowerCase() === assignTo.toLowerCase()) {
        taskAssigned = true;
        // Add task to employee
        const updatedTasks = [...employee.tasks, newTask];
        
        // Update task counts
        const updatedTaskCounts = {
          ...employee.taskCounts,
          newTask: employee.taskCounts.newTask + 1,
        };

        return {
          ...employee,
          tasks: updatedTasks,
          taskCounts: updatedTaskCounts,
        };
      }
      return employee;
    });

    if (!taskAssigned) {
      alert("Employee not found! Please check the name or email.");
      return;
    }

    // Save back to localStorage
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));

    // Update context to reflect changes in real-time
    updateEmployeeData(updatedEmployees);

    // Reset form
    setTaskTitle("");
    setTaskDescription("");
    setTaskDate("");
    setAssignTo("");
    setCategory("");

    alert("Task created successfully!");
  };

  return (
    <div className="mt-5 p-5">
      <form
        onSubmit={submitHandler}
        className="flex w-full flex-wrap items-start justify-between rounded-xl border border-white/5 bg-[#1c1c1c] p-8 shadow-2xl shadow-black/50"
      >
        <div className="w-full space-y-6 md:w-[48%]">
          {/* Task Title */}
          <div>
            <h3 className="mb-1 text-xs font-semibold tracking-widest text-gray-400 uppercase">
              Task Title
            </h3>
            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              type="text"
              placeholder="Make UI design"
              required
              className="w-full rounded-lg border border-gray-700 bg-[#2c2c2c]/50 px-4 py-3 text-sm text-white transition-all duration-300 outline-none placeholder:text-gray-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50"
            />
          </div>

          {/* Date Input*/}
          <div>
            <h3 className="mb-1 text-xs font-semibold tracking-widest text-gray-400 uppercase">
              Date
            </h3>
            <input
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              type="date"
              required
              onClick={(e) => e.target.showPicker()}
              className="w-full rounded-lg border border-gray-700 bg-[#2c2c2c]/50 px-4 py-3 text-sm text-white transition-all duration-300 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-60 [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:hover:opacity-100"
            />
          </div>

          {/* Assign To */}
          <div>
            <h3 className="mb-1 text-xs font-semibold tracking-widest text-gray-400 uppercase">
              Assign To
            </h3>
            <input
              value={assignTo}
              onChange={(e) => setAssignTo(e.target.value)}
              type="text"
              placeholder="Employee Name or Email"
              required
              className="w-full rounded-lg border border-gray-700 bg-[#2c2c2c]/50 px-4 py-3 text-sm text-white transition-all duration-300 outline-none placeholder:text-gray-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50"
            />
            {updateEmployeeData && (
              <p className="mt-1 text-xs text-gray-500">
                Available employees shown in AllTask section below
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <h3 className="mb-1 text-xs font-semibold tracking-widest text-gray-400 uppercase">
              Category
            </h3>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              type="text"
              placeholder="design, dev, etc"
              required
              className="w-full rounded-lg border border-gray-700 bg-[#2c2c2c]/50 px-4 py-3 text-sm text-white transition-all duration-300 outline-none placeholder:text-gray-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50"
            />
          </div>
        </div>

        {/* Right Column - Description & Button */}
        <div className="mt-6 flex w-full flex-col items-start md:mt-0 md:w-[45%]">
          {/* Description */}
          <div className="mb-6 w-full">
            <h3 className="mb-1 text-xs font-semibold tracking-widest text-gray-400 uppercase">
              Description
            </h3>
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              required
              className="h-64 w-full resize-none rounded-lg border border-gray-700 bg-[#2c2c2c]/50 px-4 py-3 text-sm text-white transition-all duration-300 outline-none placeholder:text-gray-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50"
              placeholder="Detailed description of the task..."
            ></textarea>
          </div>

          {/* Create Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-linear-to-r from-emerald-500 to-emerald-700 px-5 py-3 text-sm font-bold tracking-wide text-white uppercase shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:scale-[1.01] hover:from-emerald-400 hover:to-emerald-600 hover:shadow-emerald-500/40 active:scale-95"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;