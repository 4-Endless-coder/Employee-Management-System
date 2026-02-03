import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Clock, CheckCircle2, XCircle, AlertCircle, TrendingUp, Edit2, Trash2, Search } from "lucide-react";

const AllTask = ({ data }) => {
  const [employees, setEmployees] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

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
        className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent p-5 shadow-[0_8px_32px_0_rgba(0,0,0,0.37),inset_0_1px_0_0_rgba(255,255,255,0.1)] backdrop-blur-xl sm:p-6 md:p-8"
      >
        <div className="flex flex-col items-center justify-center min-h-[500px] gap-6">
          {/* Animated SVG Illustration */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-xs sm:max-w-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 500 500"
              className="w-full h-auto"
            >
              {/* Background circle with gradient */}
              <defs>
                <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.1 }} />
                  <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.1 }} />
                </linearGradient>
                <linearGradient id="personGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#60a5fa', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                </linearGradient>
              </defs>

              {/* Background circle */}
              <motion.circle
                cx="250"
                cy="250"
                r="200"
                fill="url(#bgGradient)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />

              {/* Floating document icons */}
              <motion.g
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <rect x="120" y="180" width="80" height="100" rx="8" fill="#60a5fa" opacity="0.3" />
                <line x1="135" y1="200" x2="185" y2="200" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
                <line x1="135" y1="220" x2="185" y2="220" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
                <line x1="135" y1="240" x2="170" y2="240" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
              </motion.g>

              <motion.g
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3,
                }}
              >
                <rect x="300" y="200" width="80" height="100" rx="8" fill="#8b5cf6" opacity="0.3" />
                <line x1="315" y1="220" x2="365" y2="220" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
                <line x1="315" y1="240" x2="365" y2="240" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
                <line x1="315" y1="260" x2="350" y2="260" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
              </motion.g>

              {/* Central person illustration */}
              <g>
                {/* Body */}
                <motion.ellipse
                  cx="250"
                  cy="320"
                  rx="50"
                  ry="70"
                  fill="url(#personGradient)"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                />
                {/* Head */}
                <motion.circle
                  cx="250"
                  cy="230"
                  r="40"
                  fill="url(#personGradient)"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
                {/* Arms */}
                <motion.line
                  x1="200"
                  y1="280"
                  x2="160"
                  y2="320"
                  stroke="#3b82f6"
                  strokeWidth="12"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                />
                <motion.line
                  x1="300"
                  y1="280"
                  x2="340"
                  y2="320"
                  stroke="#3b82f6"
                  strokeWidth="12"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                />
              </g>

              {/* Question marks floating around */}
              <motion.text
                x="140"
                y="140"
                fontSize="40"
                fill="#60a5fa"
                opacity="0.4"
                animate={{
                  y: [140, 130, 140],
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ?
              </motion.text>
              <motion.text
                x="340"
                y="160"
                fontSize="40"
                fill="#8b5cf6"
                opacity="0.4"
                animate={{
                  y: [160, 150, 160],
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                  duration: 2.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              >
                ?
              </motion.text>
            </svg>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center space-y-3"
          >
            <h3 className="text-2xl font-bold text-white">No Employees Found</h3>
            <p className="text-white/60 max-w-md text-sm sm:text-base">
              It looks like there are no employees in the system yet. Start by adding some team members to get started!
            </p>
          </motion.div>

          {/* Optional CTA button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-6 py-3 text-sm font-semibold text-blue-300 backdrop-blur-sm transition-all hover:bg-blue-500/20 hover:border-blue-500/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add Your First Employee
          </motion.button>
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

  // Filter employees based on search query
  const filteredEmployees = employees.filter((employee) => {
    const query = searchQuery.toLowerCase();
    return (
      employee.firstName?.toLowerCase().includes(query) ||
      employee.email?.toLowerCase().includes(query) ||
      employee.tasks?.some(task => 
        task.taskTitle?.toLowerCase().includes(query) ||
        task.category?.toLowerCase().includes(query)
      )
    );
  });

  // Empty state component for filtered results
  const FilteredEmptyState = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-12 gap-6"
    >
      {/* Search illustration SVG */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[280px]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 400 400"
          className="w-full h-auto"
        >
          <defs>
            <linearGradient id="searchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: '#ef4444', stopOpacity: 0.8 }} />
            </linearGradient>
          </defs>

          {/* Magnifying glass */}
          <motion.circle
            cx="150"
            cy="150"
            r="80"
            fill="none"
            stroke="url(#searchGradient)"
            strokeWidth="16"
            initial={{ pathLength: 0, rotate: -45 }}
            animate={{ pathLength: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          <motion.line
            x1="210"
            y1="210"
            x2="280"
            y2="280"
            stroke="url(#searchGradient)"
            strokeWidth="16"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />

          {/* Question mark inside */}
          <motion.text
            x="150"
            y="170"
            fontSize="60"
            fill="#f59e0b"
            textAnchor="middle"
            opacity="0.5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            ?
          </motion.text>

          {/* Floating dots */}
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx={250 + i * 30}
              cy={100}
              r="6"
              fill="#f59e0b"
              opacity="0.4"
              animate={{
                y: [0, -10, 0],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </svg>
      </motion.div>

      {/* Text content */}
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold text-white">No Results Found</h3>
        <p className="text-white/60 max-w-sm text-sm">
          We couldn't find any employees or tasks matching <span className="text-amber-400 font-semibold">"{searchQuery}"</span>
        </p>
        <button
          onClick={() => setSearchQuery("")}
          className="mt-4 text-sm text-blue-400 hover:text-blue-300 underline underline-offset-2"
        >
          Clear search
        </button>
      </div>
    </motion.div>
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

    // Shorter labels for better fit
    const shortLabel = {
      "New": "New",
      "Active": "Active",
      "Completed": "Done",
      "Failed": "Failed"
    }[config.label] || config.label;

    return (
      <motion.div
        className={`flex flex-col items-center justify-center gap-1.5 rounded-lg border bg-gradient-to-br px-2.5 py-2 backdrop-blur-sm min-w-[4.5rem] ${colorClasses[config.color]}`}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex items-center gap-1.5">
          <Icon className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="text-lg font-bold tabular-nums">{config.count}</span>
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-wider opacity-90">{shortLabel}</span>
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
      <div className="relative h-full rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent p-5 shadow-[0_8px_32px_0_rgba(0,0,0,0.37),inset_0_1px_0_0_rgba(255,255,255,0.1)] backdrop-blur-xl sm:p-6 md:p-8">
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
          className="relative z-10 mb-6 grid grid-cols-4 gap-3"
        >
          <StatusBadge config={getStatusConfig(totalStats.newTask, "newTask")} />
          <StatusBadge config={getStatusConfig(totalStats.active, "active")} />
          <StatusBadge config={getStatusConfig(totalStats.completed, "completed")} />
          <StatusBadge config={getStatusConfig(totalStats.failed, "failed")} />
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="relative z-10 mb-4"
        >
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search employees, tasks, or categories..."
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 pl-10 text-sm text-white placeholder:text-white/40 backdrop-blur-sm transition-all outline-none focus:border-emerald-500/50 focus:bg-white/10 hover:border-white/20"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="mt-2 text-xs text-white/50">
              Found {filteredEmployees.length} result{filteredEmployees.length !== 1 ? 's' : ''}
            </p>
          )}
        </motion.div>

        {/* Live Feed Cards */}
        <div className="relative z-10 h-[calc(100%-200px)] space-y-3 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:hover:bg-white/20">
          {filteredEmployees.length === 0 ? (
            <FilteredEmptyState />
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredEmployees.map((employee, index) => {
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
                    <div className="flex items-center gap-2 flex-shrink-0">
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
                            className="flex flex-col items-center justify-center gap-1 min-w-[2.5rem] max-w-[3rem]"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <Icon className={`h-4 w-4 ${colorMap[key]} flex-shrink-0`} />
                            <span className={`text-sm font-bold ${colorMap[key]} tabular-nums`}>
                              {count}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Expanded Details - Task List with Edit/Delete ONLY on tasks */}
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
                            className="group/task rounded-lg border border-white/5 bg-white/5 p-3 backdrop-blur-sm hover:bg-white/10 transition-colors"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-white truncate">{task.taskTitle}</h4>
                                <p className="mt-1 text-xs text-white/60 line-clamp-2">{task.taskDescription}</p>
                                <div className="mt-2 flex items-center gap-3 text-xs text-white/50">
                                  <span className="truncate">{task.category}</span>
                                  <span>•</span>
                                  <span className="whitespace-nowrap">{task.taskDate}</span>
                                </div>
                              </div>
                              {/* Edit/Delete icons ONLY on individual tasks */}
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Handle edit task logic here
                                    console.log('Edit task:', task.taskTitle);
                                  }}
                                  className="rounded-lg bg-white/10 p-2 text-white/70 hover:bg-white/20 hover:text-white transition-all"
                                  title="Edit Task"
                                >
                                  <Edit2 className="h-4 w-4" />
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Handle delete task logic here
                                    console.log('Delete task:', task.taskTitle);
                                  }}
                                  className="rounded-lg bg-rose-500/20 p-2 text-rose-400 hover:bg-rose-500/30 transition-all"
                                  title="Delete Task"
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
                </motion.div>
              );
            })}
          </AnimatePresence>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AllTask;