import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, CheckCircle2 } from "lucide-react";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [showResetSuccess, setShowResetSuccess] = useState(false);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    // Store current values
    const emailValue = email;
    const passwordValue = password;

    // Reset form immediately for better UX
    setEmail("");
    setPassword("");

    // Call parent login handler
    handleLogin(emailValue, passwordValue);

    // Navigation will be handled automatically by App.jsx routes
  };

  // Reset Demo Data Function
  const handleResetDemo = async () => {
    setIsResetting(true);

    // Wait a bit for animation
    await new Promise(resolve => setTimeout(resolve, 500));

    // Clear all localStorage
    localStorage.clear();

    // Re-seed default data
    const employees = [
      {
        "id": 1,
        "firstName": "Arjun",
        "email": "e1@e.com",
        "password": "123",
        "taskCounts": {
          "active": 1,
          "newTask": 1,
          "completed": 1,
          "failed": 0
        },
        "tasks": [
          {
            "active": false,
            "newTask": true,
            "completed": false,
            "failed": false,
            "taskTitle": "UI Redesign",
            "taskDescription": "Redesign the dashboard homepage using Tailwind CSS.",
            "taskDate": "2026-02-15",
            "category": "Design"
          },
          {
            "active": false,
            "newTask": false,
            "completed": true,
            "failed": false,
            "taskTitle": "Client Meeting",
            "taskDescription": "Discuss project requirements with the client.",
            "taskDate": "2026-01-20",
            "category": "Meeting"
          },
          {
            "active": true,
            "newTask": false,
            "completed": false,
            "failed": false,
            "taskTitle": "Fix Navigation Bug",
            "taskDescription": "Navbar not collapsing on mobile devices.",
            "taskDate": "2026-02-05",
            "category": "Development"
          }
        ]
      },
      {
        "id": 2,
        "firstName": "Sneha",
        "email": "employee2@example.com",
        "password": "123",
        "taskCounts": {
          "active": 1,
          "newTask": 0,
          "completed": 1,
          "failed": 1
        },
        "tasks": [
          {
            "active": true,
            "newTask": false,
            "completed": false,
            "failed": false,
            "taskTitle": "Database Optimization",
            "taskDescription": "Optimize SQL queries for better performance.",
            "taskDate": "2026-02-10",
            "category": "Database"
          },
          {
            "active": false,
            "newTask": false,
            "completed": true,
            "failed": false,
            "taskTitle": "Design System Update",
            "taskDescription": "Update the color palette in the design system.",
            "taskDate": "2026-01-25",
            "category": "Design"
          },
          {
            "active": false,
            "newTask": false,
            "completed": false,
            "failed": true,
            "taskTitle": "API Integration",
            "taskDescription": "Integrate the payment gateway API.",
            "taskDate": "2026-01-15",
            "category": "Backend"
          }
        ]
      },
      {
        "id": 3,
        "firstName": "Ravi",
        "email": "employee3@example.com",
        "password": "123",
        "taskCounts": {
          "active": 2,
          "newTask": 1,
          "completed": 1,
          "failed": 0
        },
        "tasks": [
          {
            "active": false,
            "newTask": true,
            "completed": false,
            "failed": false,
            "taskTitle": "Create User Onboarding",
            "taskDescription": "Design the user onboarding flow screens.",
            "taskDate": "2026-02-20",
            "category": "UX Design"
          },
          {
            "active": true,
            "newTask": false,
            "completed": false,
            "failed": false,
            "taskTitle": "Write Documentation",
            "taskDescription": "Document the API endpoints for the new module.",
            "taskDate": "2026-02-08",
            "category": "Documentation"
          },
          {
            "active": false,
            "newTask": false,
            "completed": true,
            "failed": false,
            "taskTitle": "Code Review",
            "taskDescription": "Review the pull requests for the authentication module.",
            "taskDate": "2026-01-22",
            "category": "Development"
          }
        ]
      },
      {
        "id": 4,
        "firstName": "Priya",
        "email": "employee4@example.com",
        "password": "123",
        "taskCounts": {
          "active": 1,
          "newTask": 1,
          "completed": 0,
          "failed": 1
        },
        "tasks": [
          {
            "active": false,
            "newTask": true,
            "completed": false,
            "failed": false,
            "taskTitle": "Social Media Assets",
            "taskDescription": "Create banners for the upcoming marketing campaign.",
            "taskDate": "2026-02-18",
            "category": "Marketing"
          },
          {
            "active": false,
            "newTask": false,
            "completed": false,
            "failed": true,
            "taskTitle": "Server Migration",
            "taskDescription": "Migrate the production server to AWS.",
            "taskDate": "2026-01-10",
            "category": "DevOps"
          },
          {
            "active": true,
            "newTask": false,
            "completed": false,
            "failed": false,
            "taskTitle": "Footer Redesign",
            "taskDescription": "Update the footer links and layout.",
            "taskDate": "2026-02-12",
            "category": "Design"
          }
        ]
      },
      {
        "id": 5,
        "firstName": "Karan",
        "email": "employee5@example.com",
        "password": "123",
        "taskCounts": {
          "active": 2,
          "newTask": 1,
          "completed": 1,
          "failed": 0
        },
        "tasks": [
          {
            "active": false,
            "newTask": true,
            "completed": false,
            "failed": false,
            "taskTitle": "Unit Testing",
            "taskDescription": "Write unit tests for the user service.",
            "taskDate": "2026-02-25",
            "category": "QA"
          },
          {
            "active": true,
            "newTask": false,
            "completed": false,
            "failed": false,
            "taskTitle": "Performance Audit",
            "taskDescription": "Run Lighthouse performance checks on the homepage.",
            "taskDate": "2026-02-14",
            "category": "Analysis"
          },
          {
            "active": false,
            "newTask": false,
            "completed": true,
            "failed": false,
            "taskTitle": "Team Lunch",
            "taskDescription": "Organize the monthly team lunch.",
            "taskDate": "2026-01-28",
            "category": "HR"
          }
        ]
      }
    ];

    const admin = [
      {
        "id": 1,
        "firstName": "Ashesh",
        "email": "admin@me.com",
        "password": "123"
      }
    ];

    // Save to localStorage
    localStorage.setItem('employees', JSON.stringify(employees));
    localStorage.setItem('admin', JSON.stringify(admin));

    // Show success message
    setIsResetting(false);
    setShowResetSuccess(true);

    // Hide success message after 2 seconds
    setTimeout(() => {
      setShowResetSuccess(false);
    }, 2000);
  };

  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* --- SMART NOTIFICATIONS (Hover/Click to Reveal) --- */}
      <div className="absolute top-4 left-4 z-20 flex max-w-[90%] flex-col gap-3">
        {/* 1. Admin Login (Emerald) */}
        <div className="group flex w-fit cursor-pointer items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.1)] backdrop-blur-md transition-all hover:bg-emerald-500/20 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]">
          <span className="relative flex h-2 w-2">
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          <span className="block group-hover:hidden group-active:hidden">
            Admin Login Details
          </span>
          <span className="hidden font-mono tracking-tighter group-hover:block group-active:block">
            admin@me.com | 123
          </span>
        </div>

        {/* 2. Employee Login (Blue) */}
        <div className="group flex w-fit cursor-pointer items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs font-medium text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.1)] backdrop-blur-md transition-all hover:bg-blue-500/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
          <span className="relative flex h-2 w-2">
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
          </span>
          <span className="block group-hover:hidden group-active:hidden">
            Employee Login Details
          </span>
          <span className="hidden font-mono tracking-tighter group-hover:block group-active:block">
            e1@e.com | 123
          </span>
        </div>

        {/* 3. Work in Progress Mode (Amber/Orange) */}
        <div className="flex w-fit items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs font-medium tracking-wide text-amber-300 uppercase shadow-[0_0_15px_rgba(245,158,11,0.2)] backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
          </span>
          Work in Progress
        </div>
      </div>

      {/* Reset Demo Button - Top Right */}
      <div className="absolute top-4 right-4 z-20">
        <motion.button
          onClick={handleResetDemo}
          disabled={isResetting}
          className="group relative flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-xs font-medium text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.2)] backdrop-blur-md transition-all hover:bg-rose-500/20 hover:shadow-[0_0_20px_rgba(244,63,94,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: isResetting ? 360 : 0 }}
            transition={{ duration: 1, repeat: isResetting ? Infinity : 0, ease: "linear" }}
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </motion.div>
          <span className="uppercase tracking-wider">
            {isResetting ? 'Resetting...' : 'Reset Demo'}
          </span>
        </motion.button>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {showResetSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="absolute top-20 right-4 z-30 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/20 px-4 py-3 shadow-lg backdrop-blur-xl"
          >
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            <span className="text-sm font-semibold text-emerald-300">
              Demo data reset successfully!
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- LOGIN FORM --- */}
      <div className="m-4 w-full max-w-md rounded-2xl border border-gray-700 bg-gray-900/60 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight text-white">
            Welcome Back
          </h2>
          <p className="text-gray-400">Please enter your details to sign in</p>
        </div>

        <form onSubmit={submitHandler} className="flex flex-col gap-6">
          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <label className="ml-1 text-sm font-medium text-gray-300">
              Email Address
            </label>
            <div className="relative">
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-600 bg-gray-800/50 px-5 py-3 text-white placeholder-gray-500 transition-all outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                type="email"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-2">
            <label className="ml-1 text-sm font-medium text-gray-300">
              Password
            </label>
            <div className="relative">
              <input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-600 bg-gray-800/50 px-5 py-3 text-white placeholder-gray-500 transition-all outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-4 text-gray-400 transition-colors hover:text-white"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="mt-1 flex items-center justify-between">
            <label className="group flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                className="peer h-4 w-4 rounded border-gray-600 bg-gray-800 text-emerald-500 focus:ring-emerald-500"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300">
                Remember me
              </span>
            </label>
            <a
              href="#"
              className="text-sm text-emerald-400 hover:text-emerald-300 hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          <button className="mt-4 w-full rounded-full bg-emerald-600 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:bg-emerald-700 active:scale-95">
            Log in
          </button>
        </form>

        {/* Info Box */}
        <div className="mt-6 rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
          <p className="text-xs text-blue-300/80 text-center">
            💡 <strong>Tip:</strong> If you encounter any issues or messed up data, use the <strong className="text-rose-400">Reset Demo</strong> button above to restore everything to defaults.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;