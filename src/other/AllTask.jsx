import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Clock, CheckCircle2, XCircle, AlertCircle, TrendingUp, Edit2, Trash2 } from "lucide-react";

const AllTask = ({ data }) => {
  const [employees, setEmployees] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    // AuthContext provides { employees, admin, updateEmployeeData }
    // So data.employees should exist when passed from AdminDashboard
    if (data && data.employees) {
      setEmployees(data.employees);
    } else {
      // Fallback to localStorage
      const storedEmployees = JSON.parse(localStorage.getItem("employees") || "[]");
      setEmployees(storedEmployees);
    }
  }, [data]);

  // Listen for storage changes to update in real-time
  useEffect(() => {
    const handleStorageChange = () => {
      const storedEmployees = JSON.parse(localStorage.getItem("employees") || "[]");
      setEmployees(storedEmployees);
    };

    window.addEventListener("storage", handleStorageChange);
    // Also check periodically for same-tab updates
    const interval = setInterval(handleStorageChange, 500);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  if (!employees || employees.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.37),inset_0_1px_0_0_rgba(255,255,255,0.1)] backdrop-blur-xl"
      >
        <div className="flex h-full min-h-[400px] items-center justify-center">
          <p className="text-white/50">Loading employee data...</p>
        </div>
      </motion.div>
    );
  }

  // Calculate total stats
  const totalStats = employees.reduce(
    (acc, emp) => ({
      newTask: acc.newTask + emp.taskCounts.newTask,
      active: acc.active + emp.taskCounts.active,
      completed: acc.completed + emp.taskCounts.completed,
      failed: acc.failed + emp.taskCounts.failed,
    }),
    { newTask: 0, active: 0, completed: 0, failed: 0 }
  );

  // Get status color and icon
  const getStatusConfig = (count, type) => {
    const configs = {
      newTask: { color: "blue", icon: Clock, label: "New" },
      active: { color: "yellow", icon: TrendingUp, label: "Active" },
      completed: { color: "emerald", icon: CheckCircle2, label: "Completed" },
      failed: { color: "rose", icon: XCircle, label: "Failed" },
    };
    return { ...configs[type], count };
  };

  const StatusBadge = ({ config }) => {
    const Icon = config.icon;
    const colorClasses = {
      blue: "from-blue-500/20 to-blue-600/10 text-blue-400 border-blue-500/30",
      yellow: "from-yellow-500/20 to-yellow-600/10 text-yellow-400 border-yellow-500/30",
      emerald: "from-emerald-500/20 to-emerald-600/10 text-emerald-400 border-emerald-500/30",
      rose: "from-rose-500/20 to-rose-600/10 text-rose-400 border-rose-500/30",
    };

    return (
      <motion.div
        className={`flex items-center gap-1.5 rounded-lg border bg-gradient-to-br px-2.5 py-1.5 backdrop-blur-sm min-w-0 ${colorClasses[config.color]}`}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Icon className="h-3.5 w-3.5 flex-shrink-0" />
        <span className="text-xs font-semibold whitespace-nowrap">{config.label}</span>
        <span className="text-xs font-bold whitespace-nowrap">{config.count}</span>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative h-full"
    >
      {/* Neumorphic Glassmorphism Card */}
      <div className="relative h-full rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.37),inset_0_1px_0_0_rgba(255,255,255,0.1)] backdrop-blur-xl sm:p-8">
        {/* Inner shadow for depth */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent via-transparent to-black/20" />
        
        {/* Subtle glow effect */}
        <div className="pointer-events-none absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-rose-500/10 via-transparent to-transparent opacity-50 blur-xl" />

        {/* Header */}
        <div className="relative z-10 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500/20 to-rose-600/10 backdrop-blur-sm"
            >
              <AlertCircle className="h-5 w-5 text-rose-400" />
            </motion.div>
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-xl font-bold text-white sm:text-2xl"
                style={{ letterSpacing: '-0.02em' }}
              >
                Live Feed
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-0.5 text-xs text-white/50"
              >
                Real-time mission status
              </motion.p>
            </div>
          </div>
        </div>

        {/* Total Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="relative z-10 mb-6 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3"
        >
          <StatusBadge config={getStatusConfig(totalStats.newTask, "newTask")} />
          <StatusBadge config={getStatusConfig(totalStats.active, "active")} />
          <StatusBadge config={getStatusConfig(totalStats.completed, "completed")} />
          <StatusBadge config={getStatusConfig(totalStats.failed, "failed")} />
        </motion.div>

        {/* Live Feed Cards */}
        <div className="relative z-10 h-[calc(100%-200px)] space-y-3 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:hover:bg-white/20">
          <AnimatePresence mode="popLayout">
            {employees.map((employee, index) => {
              const isExpanded = expandedCard === employee.id;
              const isHovered = hoveredCard === employee.id;

              return (
                <motion.div
                  key={employee.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  transition={{
                    layout: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                    opacity: { duration: 0.3 },
                    y: { duration: 0.4 },
                  }}
                  onMouseEnter={() => setHoveredCard(employee.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => setExpandedCard(isExpanded ? null : employee.id)}
                  className="group relative cursor-pointer rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-4 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 sm:p-5"
                >
                  {/* New entry highlight (if task was just created) */}
                  <motion.div
                    className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-emerald-500/30 via-emerald-500/20 to-transparent opacity-0 blur-sm"
                    animate={{
                      opacity: employee.tasks?.some(t => t.newTask) ? [0, 1, 0] : 0,
                    }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  />

                  {/* Main Content */}
                  <div className="relative z-10 flex items-center justify-between gap-4">
                    {/* Left: Employee Info */}
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <motion.div
                        className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 backdrop-blur-sm ring-2 ring-white/10 flex-shrink-0"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <User className="h-6 w-6 text-emerald-400" />
                      </motion.div>
                      
                      <div className="min-w-0 flex-1">
                        <motion.h3
                          className="text-lg font-bold text-white sm:text-xl truncate"
                          style={{ letterSpacing: '-0.01em' }}
                        >
                          {employee.firstName}
                        </motion.h3>
                        <p className="text-xs text-white/50 truncate">{employee.email}</p>
                      </div>
                    </div>

                    {/* Right: Task Counts */}
                    <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                      {Object.entries(employee.taskCounts).map(([key, count]) => {
                        const config = getStatusConfig(count, key);
                        const Icon = config.icon;
                        const colorMap = {
                          newTask: "text-blue-400",
                          active: "text-yellow-400",
                          completed: "text-emerald-400",
                          failed: "text-rose-400",
                        };

                        return (
                          <motion.div
                            key={key}
                            className="flex flex-col items-center gap-1 min-w-[2.5rem]"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <Icon className={`h-4 w-4 ${colorMap[key]} flex-shrink-0`} />
                            <span className={`text-sm font-bold ${colorMap[key]} whitespace-nowrap`}>
                              {count}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {isExpanded && employee.tasks && employee.tasks.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="relative z-10 mt-4 space-y-2 border-t border-white/10 pt-4"
                      >
                        {employee.tasks.map((task, taskIndex) => (
                          <motion.div
                            key={taskIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: taskIndex * 0.05 }}
                            className="rounded-lg border border-white/5 bg-white/5 p-3 backdrop-blur-sm"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-semibold text-white">{task.taskTitle}</h4>
                                <p className="mt-1 text-xs text-white/60">{task.taskDescription}</p>
                                <div className="mt-2 flex items-center gap-3 text-xs text-white/50">
                                  <span>{task.category}</span>
                                  <span>•</span>
                                  <span>{task.taskDate}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="rounded-lg bg-white/10 p-2 text-white/70 hover:bg-white/20 hover:text-white"
                                >
                                  <Edit2 className="h-4 w-4" />
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="rounded-lg bg-rose-500/20 p-2 text-rose-400 hover:bg-rose-500/30"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </motion.button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Action Icons - Only show when expanded */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-4 top-4 flex items-center gap-2 z-20"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <motion.button
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.9 }}
                          className="rounded-lg bg-white/10 p-2 text-white/70 backdrop-blur-sm hover:bg-white/20 hover:text-white"
                        >
                          <Edit2 className="h-4 w-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.9 }}
                          className="rounded-lg bg-rose-500/20 p-2 text-rose-400 backdrop-blur-sm hover:bg-rose-500/30"
                        >
                          <Trash2 className="h-4 w-4" />
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default AllTask;
