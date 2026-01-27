import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../context/AuthProvider";

const TaskList = ({ data }) => {
  const { updateEmployeeData } = useContext(AuthContext);

  // Guard clause: wait for data to load
  if (!data || !data.tasks) {
    return (
      <div className="mt-8 flex h-[260px] w-full items-center justify-center rounded-2xl border border-white/5 bg-white/5 backdrop-blur-2xl">
        <p className="text-sm text-slate-300">Loading tasks...</p>
      </div>
    );
  }

  const tasks = data.tasks;

  // Function to handle Accept Task (NO RELOAD!)
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
    updateEmployeeData(updatedEmployees); // This triggers re-render!
  };

  // Function to handle Complete Task (NO RELOAD!)
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
    updateEmployeeData(updatedEmployees); // This triggers re-render!
  };

  // Function to handle Failed Task (NO RELOAD!)
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
    updateEmployeeData(updatedEmployees); // This triggers re-render!
  };

  const getTaskVisualConfig = (task) => {
    if (task.failed) {
      return {
        badge: "Failed",
        borderColor: "border-rose-500/60",
        accentBg: "from-rose-500/25 to-red-500/15",
        pillBg: "bg-rose-500/30",
      };
    }
    if (task.completed) {
      return {
        badge: "Completed",
        borderColor: "border-emerald-500/60",
        accentBg: "from-emerald-500/25 to-green-500/15",
        pillBg: "bg-emerald-500/30",
      };
    }
    if (task.active) {
      return {
        badge: "Active",
        borderColor: "border-amber-400/70",
        accentBg: "from-amber-400/25 to-yellow-400/15",
        pillBg: "bg-amber-400/30",
      };
    }
    if (task.newTask) {
      return {
        badge: "New",
        borderColor: "border-cyan-400/80",
        accentBg: "from-cyan-400/25 to-sky-500/15",
        pillBg: "bg-cyan-400/30",
      };
    }
    return {
      badge: "Pending",
      borderColor: "border-slate-500/50",
      accentBg: "from-slate-500/20 to-slate-600/10",
      pillBg: "bg-slate-500/30",
    };
  };

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-baseline justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Mission Scroller
          </p>
          <p className="text-xs text-slate-500">Drag or scroll horizontally</p>
        </div>
      </div>

      <div
        id="tasklist"
        className="flex h-[320px] w-full snap-x snap-mandatory flex-nowrap items-stretch gap-4 overflow-x-auto py-3"
      >
        <AnimatePresence initial={false}>
          {tasks.length === 0 ? (
            <motion.div
              key="empty"
              className="flex h-full w-full items-center justify-center rounded-2xl border border-dashed border-slate-600/70 bg-slate-900/40 text-sm text-slate-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              No missions assigned yet.
            </motion.div>
          ) : (
            tasks.map((task, idx) => {
              const visual = getTaskVisualConfig(task);

              return (
                <motion.div
                  key={`${task.taskTitle}-${idx}`}
                  layoutId={`task-card-${idx}`}
                  initial={{ opacity: 0, x: 40, scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -30, scale: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 180,
                    damping: 20,
                  }}
                  whileHover={{ scale: 1.02 }}
                  className="group relative flex h-full w-[280px] shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-white/5 bg-linear-to-br from-white/[0.12] via-white/[0.03] to-transparent p-4 shadow-[0_18px_46px_rgba(15,23,42,0.9)] backdrop-blur-xl hover:backdrop-blur-3xl md:w-[320px]"
                >
                  {/* Glass frost overlay */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-white/40 backdrop-blur-xl opacity-80 transition-opacity duration-300 group-hover:opacity-0" />

                  {/* Accent border that morphs by status */}
                  <motion.div
                    layoutId={`task-border-${idx}`}
                    className={`pointer-events-none absolute inset-0 rounded-2xl border-2 ${visual.borderColor}`}
                  />

                  {/* Inner content */}
                  <div className="relative z-10 flex h-full flex-col gap-4">
                    <div className="flex items-start justify-between gap-3">
                      <motion.div
                        layoutId={`task-badge-${idx}`}
                        className={`inline-flex items-center gap-2 rounded-full border border-white/20 bg-gradient-to-r ${visual.accentBg} px-3 py-1 text-[11px] font-semibold text-slate-50/90`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                        <span>{visual.badge}</span>
                      </motion.div>
                      <div className="rounded-full border border-white/15 bg-white/10 px-2 py-1 text-[11px] text-slate-100">
                        {new Date(task.taskDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "2-digit",
                        })}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <motion.h3
                        layoutId={`task-title-${idx}`}
                        className="line-clamp-2 text-lg font-semibold text-slate-50"
                      >
                        {task.taskTitle}
                      </motion.h3>
                      <p className="line-clamp-3 text-xs leading-relaxed text-slate-200/80">
                        {task.taskDescription}
                      </p>
                    </div>

                    <div className="mt-auto space-y-3 border-t border-white/10 pt-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                          Category
                        </span>
                        <span
                          className={`rounded-full px-3 py-1 text-[11px] font-medium text-slate-50 ${visual.pillBg}`}
                        >
                          {task.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* New Task */}
                        {task.newTask &&
                          !task.active &&
                          !task.completed &&
                          !task.failed && (
                            <motion.button
                              layoutId={`task-accept-${idx}`}
                              onClick={() => handleAcceptTask(idx)}
                              whileTap={{ scale: 0.96 }}
                              className="flex-1 rounded-xl bg-cyan-500/30 px-3 py-2 text-xs font-semibold text-cyan-100 shadow-[0_0_18px_rgba(8,145,178,0.6)] backdrop-blur-md transition-colors duration-200 hover:bg-cyan-500/45"
                            >
                              Accept Task
                            </motion.button>
                          )}

                        {/* Active task buttons */}
                        {task.active &&
                          !task.completed &&
                          !task.failed && (
                            <>
                              <motion.button
                                layoutId={`task-complete-${idx}`}
                                onClick={() => handleCompleteTask(idx)}
                                whileTap={{ scale: 0.96 }}
                                className="flex-1 rounded-xl bg-emerald-500/30 px-3 py-2 text-xs font-semibold text-emerald-100 shadow-[0_0_18px_rgba(16,185,129,0.6)] backdrop-blur-md transition-colors duration-200 hover:bg-emerald-500/45"
                              >
                                Complete
                              </motion.button>
                              <motion.button
                                layoutId={`task-fail-${idx}`}
                                onClick={() => handleFailTask(idx)}
                                whileTap={{ scale: 0.96 }}
                                className="flex-1 rounded-xl bg-rose-500/30 px-3 py-2 text-xs font-semibold text-rose-100 shadow-[0_0_18px_rgba(244,63,94,0.6)] backdrop-blur-md transition-colors duration-200 hover:bg-rose-500/45"
                              >
                                Mark Failed
                              </motion.button>
                            </>
                          )}

                        {/* Completed / Failed status */}
                        {(task.completed || task.failed) && (
                          <motion.div
                            layoutId={`task-status-pill-${idx}`}
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-slate-100 backdrop-blur-md"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                            <span>
                              {task.completed ? "Completed" : "Failed"}
                            </span>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TaskList;