import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Sparkles, CheckCircle2 } from "lucide-react";
import { AuthContext } from "../context/AuthProvider";

const CreateTask = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [category, setCategory] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const authContext = useContext(AuthContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

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
    const employees = JSON.parse(localStorage.getItem("employees"));
    
    if (!employees || employees.length === 0) {
      alert("No employees found in the system!");
      setIsSubmitting(false);
      return;
    }

    // Find the employee to assign task to
    let taskAssigned = false;
    const updatedEmployees = employees.map((employee) => {
      const matchesName = employee.firstName.toLowerCase() === assignTo.toLowerCase();
      const matchesEmail = employee.email.toLowerCase() === assignTo.toLowerCase();
      
      if (matchesName || matchesEmail) {
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
      alert(`Employee "${assignTo}" not found! Please check the name or email.\n\nAvailable employees:\n${employees.map(e => `- ${e.firstName} (${e.email})`).join('\n')}`);
      setIsSubmitting(false);
      return;
    }

    // Save back to localStorage
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));

    // Update context to reflect changes in real-time
    if (authContext && authContext.updateEmployeeData) {
      authContext.updateEmployeeData(updatedEmployees);
    }

    // Reset form
    setTaskTitle("");
    setTaskDescription("");
    setTaskDate("");
    setAssignTo("");
    setCategory("");
    setFocusedField(null);

    // Show success animation
    setShowSuccess(true);
    setIsSubmitting(false);
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  // Input field component with active-glow and better label visibility
  const InputField = ({ 
    label, 
    value, 
    onChange, 
    placeholder, 
    type = "text", 
    fieldName,
    required = false,
    min,
    rows,
    ...props 
  }) => {
    const isFocused = focusedField === fieldName;
    const inputId = `input-${fieldName}`;
    
    return (
      <div className="relative">
        <label 
          htmlFor={inputId}
          className="mb-2.5 block cursor-pointer text-sm font-bold tracking-wide text-white/90 sm:text-base"
        >
          {label}
          {required && <span className="ml-1 text-emerald-400">*</span>}
        </label>
        
        <div className="relative">
          {/* Active glow border */}
          <motion.div
            className="absolute -inset-px rounded-xl pointer-events-none"
            animate={{
              opacity: isFocused ? 1 : 0,
              boxShadow: isFocused 
                ? "0 0 20px rgba(16, 185, 129, 0.4), 0 0 40px rgba(16, 185, 129, 0.2)"
                : "none",
            }}
            transition={{ duration: 0.3 }}
          />
          
          {type === "textarea" ? (
            <textarea
              id={inputId}
              value={value}
              onChange={onChange}
              onFocus={() => setFocusedField(fieldName)}
              onBlur={() => setFocusedField(null)}
              required={required}
              rows={rows || 6}
              placeholder={placeholder}
              className="relative w-full resize-none rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/50 backdrop-blur-sm transition-all duration-300 outline-none focus:border-emerald-500/50 focus:bg-white/10 hover:border-white/30"
              {...props}
            />
          ) : type === "date" ? (
            <input
              id={inputId}
              value={value}
              onChange={onChange}
              onFocus={() => setFocusedField(fieldName)}
              onBlur={() => setFocusedField(null)}
              type={type}
              required={required}
              min={min}
              placeholder={placeholder}
              onClick={(e) => {
                // Make the entire input clickable to open date picker
                e.currentTarget.showPicker?.();
              }}
              className="relative w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/50 backdrop-blur-sm transition-all duration-300 outline-none focus:border-emerald-500/50 focus:bg-white/10 hover:border-white/30 cursor-pointer [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-70 [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:hover:opacity-100"
              {...props}
            />
          ) : (
            <input
              id={inputId}
              value={value}
              onChange={onChange}
              onFocus={() => setFocusedField(fieldName)}
              onBlur={() => setFocusedField(null)}
              type={type}
              required={required}
              min={min}
              placeholder={placeholder}
              className="relative w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/50 backdrop-blur-sm transition-all duration-300 outline-none focus:border-emerald-500/50 focus:bg-white/10 hover:border-white/30 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-70 [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:hover:opacity-100"
              {...props}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {/* Neumorphic Glassmorphism Card */}
      <div className="relative rounded-2xl border border-white/10 bg-linear-to-br from-white/8 via-white/3 to-transparent p-5 shadow-[0_8px_32px_0_rgba(0,0,0,0.37),inset_0_1px_0_0_rgba(255,255,255,0.1)] backdrop-blur-xl sm:p-6 md:p-8">
        {/* Inner shadow for depth */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-b from-transparent via-transparent to-black/20" />
        
        {/* Subtle glow effect */}
        <div className="pointer-events-none absolute -inset-px rounded-2xl bg-linear-to-br from-emerald-500/10 via-transparent to-transparent opacity-50 blur-xl" />

        {/* Header */}
        <div className="relative z-10 mb-8 flex items-center gap-3">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-500/20 to-emerald-600/10 backdrop-blur-sm"
          >
            <Sparkles className="h-6 w-6 text-emerald-400" />
          </motion.div>
          
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-2xl font-bold text-white sm:text-3xl"
              style={{ letterSpacing: '-0.02em' }}
            >
              Command Center
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-1 text-sm text-white/70"
            >
              Deploy new mission directives
            </motion.p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={submitHandler} className="relative z-10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <InputField
                label="Task Title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="Enter mission title"
                fieldName="taskTitle"
                required
              />

              <InputField
                label="Due Date"
                value={taskDate}
                onChange={(e) => setTaskDate(e.target.value)}
                type="date"
                fieldName="taskDate"
                required
                min={new Date().toISOString().split('T')[0]}
              />

              <div>
                <InputField
                  label="Assign To"
                  value={assignTo}
                  onChange={(e) => setAssignTo(e.target.value)}
                  placeholder="Employee name or email"
                  fieldName="assignTo"
                  required
                />
                <p className="mt-2 text-xs text-white/60 italic">
                  Examples: "Arjun" or "e1@e.com"
                </p>
              </div>

              <InputField
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="design, dev, qa, etc"
                fieldName="category"
                required
              />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <InputField
                label="Description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Detailed mission briefing..."
                fieldName="taskDescription"
                type="textarea"
                rows={8}
                required
              />
            </div>
          </div>

          {/* Hyper-Action Button */}
          <motion.div
            className="mt-8 flex justify-end"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="group relative flex items-center gap-3 overflow-hidden rounded-xl bg-linear-to-r from-emerald-500 via-emerald-600 to-emerald-500 px-8 py-4 text-sm font-bold tracking-wide text-white uppercase shadow-lg shadow-emerald-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              animate={{
                backgroundPosition: isSubmitting 
                  ? ["0% 50%", "100% 50%", "0% 50%"]
                  : "0% 50%",
              }}
              transition={{
                backgroundPosition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
              style={{
                backgroundSize: "200% 100%",
              }}
            >
              {/* Gradient shift animation */}
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-emerald-400 via-emerald-500 to-emerald-600"
                animate={{
                  x: isSubmitting ? ["-100%", "100%"] : "-100%",
                }}
                transition={{
                  x: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              />

              {/* Success pulse overlay */}
              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.2 }}
                    className="absolute inset-0 flex items-center justify-center bg-emerald-500"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <CheckCircle2 className="h-6 w-6 text-white" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Button content */}
              <span className="relative z-10 flex items-center gap-2">
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full" />
                    </motion.div>
                    <span>Deploying...</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-5 w-5" />
                    <span>Create Task</span>
                  </>
                )}
              </span>

              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  translateX: ["-100%", "200%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: "linear",
                }}
              />
            </motion.button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
};

export default CreateTask;