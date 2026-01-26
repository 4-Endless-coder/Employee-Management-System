import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const TaskList = ({ data }) => {
  const { updateEmployeeData } = useContext(AuthContext);

  // Guard clause: wait for data to load
  if (!data || !data.tasks) {
    return (
      <div className="mt-10 flex h-[55%] w-full items-center justify-center">
        <p className="text-gray-400">Loading tasks...</p>
      </div>
    );
  }

  const tasks = data.tasks;

  // Function to handle Accept Task
  const handleAcceptTask = (taskIndex) => {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    
    const updatedEmployees = employees.map((employee) => {
      if (employee.email === data.email) {
        const updatedTasks = employee.tasks.map((task, idx) => {
          if (idx === taskIndex) {
            return {
              ...task,
              active: true,
              newTask: false,
            };
          }
          return task;
        });

        const updatedTaskCounts = {
          ...employee.taskCounts,
          active: employee.taskCounts.active + 1,
          newTask: employee.taskCounts.newTask - 1,
        };

        return {
          ...employee,
          tasks: updatedTasks,
          taskCounts: updatedTaskCounts,
        };
      }
      return employee;
    });

    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    updateEmployeeData(updatedEmployees);
    
    // Update logged in user data
    const updatedUser = updatedEmployees.find(emp => emp.email === data.email);
    localStorage.setItem('loggedInUser', JSON.stringify({ 
      role: 'employee', 
      data: updatedUser 
    }));
  };

  // Function to handle Complete Task
  const handleCompleteTask = (taskIndex) => {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    
    const updatedEmployees = employees.map((employee) => {
      if (employee.email === data.email) {
        const updatedTasks = employee.tasks.map((task, idx) => {
          if (idx === taskIndex) {
            return {
              ...task,
              active: false,
              completed: true,
            };
          }
          return task;
        });

        const updatedTaskCounts = {
          ...employee.taskCounts,
          active: employee.taskCounts.active - 1,
          completed: employee.taskCounts.completed + 1,
        };

        return {
          ...employee,
          tasks: updatedTasks,
          taskCounts: updatedTaskCounts,
        };
      }
      return employee;
    });

    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    updateEmployeeData(updatedEmployees);
    
    // Update logged in user data
    const updatedUser = updatedEmployees.find(emp => emp.email === data.email);
    localStorage.setItem('loggedInUser', JSON.stringify({ 
      role: 'employee', 
      data: updatedUser 
    }));
  };

  // Function to handle Failed Task
  const handleFailTask = (taskIndex) => {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    
    const updatedEmployees = employees.map((employee) => {
      if (employee.email === data.email) {
        const updatedTasks = employee.tasks.map((task, idx) => {
          if (idx === taskIndex) {
            return {
              ...task,
              active: false,
              failed: true,
            };
          }
          return task;
        });

        const updatedTaskCounts = {
          ...employee.taskCounts,
          active: employee.taskCounts.active - 1,
          failed: employee.taskCounts.failed + 1,
        };

        return {
          ...employee,
          tasks: updatedTasks,
          taskCounts: updatedTaskCounts,
        };
      }
      return employee;
    });

    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    updateEmployeeData(updatedEmployees);
    
    // Update logged in user data
    const updatedUser = updatedEmployees.find(emp => emp.email === data.email);
    localStorage.setItem('loggedInUser', JSON.stringify({ 
      role: 'employee', 
      data: updatedUser 
    }));
  };

  // Function to determine task styling based on status
  const getTaskStyle = (task) => {
    if (task.failed) {
      return {
        priority: "Failed",
        colorClass: "bg-gradient-to-br from-red-500 to-red-600",
        shadowClass: "shadow-red-400/50",
        tagColor: "bg-red-700/50",
      };
    }
    if (task.completed) {
      return {
        priority: "Completed",
        colorClass: "bg-gradient-to-br from-green-500 to-green-600",
        shadowClass: "shadow-green-400/50",
        tagColor: "bg-green-700/50",
      };
    }
    if (task.active) {
      return {
        priority: "Active",
        colorClass: "bg-gradient-to-br from-yellow-500 to-yellow-600",
        shadowClass: "shadow-yellow-400/50",
        tagColor: "bg-yellow-700/50",
      };
    }
    if (task.newTask) {
      return {
        priority: "New",
        colorClass: "bg-gradient-to-br from-blue-500 to-blue-600",
        shadowClass: "shadow-blue-400/50",
        tagColor: "bg-blue-700/50",
      };
    }
    return {
      priority: "Pending",
      colorClass: "bg-gradient-to-br from-slate-700 to-slate-800",
      shadowClass: "shadow-slate-500/40",
      tagColor: "bg-slate-600",
    };
  };

  return (
    <div
      id="tasklist"
      className="mt-10 flex h-[55%] w-full snap-x snap-mandatory flex-nowrap items-center gap-6 overflow-x-auto scroll-smooth py-8"
    >
      {tasks.length === 0 ? (
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-gray-400">No tasks assigned yet</p>
        </div>
      ) : (
        tasks.map((task, idx) => {
          const style = getTaskStyle(task);
          return (
            <div
              key={idx}
              className={`${style.colorClass} group relative flex h-full w-[320px] shrink-0 snap-center flex-col justify-between rounded-2xl p-6 shadow-xl ${style.shadowClass} cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:scale-105`}
            >
              <div className="pointer-events-none absolute top-0 left-0 h-full w-full bg-white/5 opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="z-10 flex items-center justify-between">
                <span
                  className={`rounded-md border border-white/20 px-3 py-1.5 text-xs font-bold text-white shadow-sm backdrop-blur-sm ${style.tagColor}`}
                >
                  {style.priority}
                </span>
                <span className="text-xs font-medium tracking-wide text-white/80">
                  {new Date(task.taskDate).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="z-10 mt-8">
                <h2 className="mb-3 text-2xl leading-none font-bold tracking-tight text-white drop-shadow-md">
                  {task.taskTitle}
                </h2>
                <p className="line-clamp-3 text-sm leading-relaxed font-medium tracking-wide text-white/85">
                  {task.taskDescription}
                </p>
              </div>

              <div className="z-10 mt-auto border-t border-white/20 pt-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs text-white/70">Category:</span>
                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
                    {task.category}
                  </span>
                </div>
                
                <div className="flex items-center justify-between gap-2">
                  {/* New Task - Show Accept Button */}
                  {task.newTask && !task.active && !task.completed && !task.failed && (
                    <button 
                      onClick={() => handleAcceptTask(idx)}
                      className="flex-1 rounded-lg bg-white/20 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/30 hover:scale-105 active:scale-95"
                    >
                      Accept Task
                    </button>
                  )}

                  {/* Active Task - Show Complete and Fail Buttons */}
                  {task.active && !task.completed && !task.failed && (
                    <>
                      <button 
                        onClick={() => handleCompleteTask(idx)}
                        className="flex-1 rounded-lg bg-green-500/30 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-green-500/50 hover:scale-105 active:scale-95"
                      >
                        Complete
                      </button>
                      <button 
                        onClick={() => handleFailTask(idx)}
                        className="flex-1 rounded-lg bg-red-500/30 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-red-500/50 hover:scale-105 active:scale-95"
                      >
                        Mark Failed
                      </button>
                    </>
                  )}
                  
                  {/* Completed Task - Show Status */}
                  {task.completed && (
                    <div className="flex-1 flex items-center justify-center gap-2 text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm font-semibold">Completed</span>
                    </div>
                  )}

                  {/* Failed Task - Show Status */}
                  {task.failed && (
                    <div className="flex-1 flex items-center justify-center gap-2 text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm font-semibold">Failed</span>
                    </div>
                  )}

                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-black transition-all duration-300 hover:bg-white hover:scale-110">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4 text-transparent transition-colors duration-300 group-hover:text-black"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default TaskList;