import React, { useState } from "react";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    handleLogin(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="relative flex h-screen w-screen items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      
      {/* --- SMART NOTIFICATIONS (Hover/Click to Reveal) --- */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-3 max-w-[90%]">
        
        {/* 1. Admin Login (Emerald) */}
        <div className="group flex w-fit cursor-pointer items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.1)] backdrop-blur-md transition-all hover:bg-emerald-500/20 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]">
          <span className="relative flex h-2 w-2">
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          {/* Default Text */}
          <span className="block group-hover:hidden group-active:hidden">
            Admin Login Details
          </span>
          {/* Revealed Text */}
          <span className="hidden group-hover:block group-active:block font-mono tracking-tighter">
            admin@me.com | 123
          </span>
        </div>

        {/* 2. Employee Login (Blue) */}
        <div className="group flex w-fit cursor-pointer items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs font-medium text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.1)] backdrop-blur-md transition-all hover:bg-blue-500/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
          <span className="relative flex h-2 w-2">
             <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
          </span>
          {/* Default Text */}
          <span className="block group-hover:hidden group-active:hidden">
            Employee Login Details
          </span>
          {/* Revealed Text */}
          <span className="hidden group-hover:block group-active:block font-mono tracking-tighter">
            e1@e.com | 123
          </span>
        </div>

        {/* 3. Work In Progress (Amber - Static) */}
        <div className="flex w-fit items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs font-medium uppercase tracking-wide text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)] backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
          </span>
          Work In Progress
        </div>

      </div>

      {/* --- LOGIN FORM --- */}
      <div className="w-full max-w-md rounded-2xl border border-gray-700 bg-gray-900/60 p-8 shadow-2xl backdrop-blur-xl m-4">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold text-white tracking-tight">
            Welcome Back
          </h2>
          <p className="text-gray-400">Please enter your details to sign in</p>
        </div>

        <form onSubmit={submitHandler} className="flex flex-col gap-6">
          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <label className="ml-1 text-sm font-medium text-gray-300">Email Address</label>
            <div className="relative">
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-600 bg-gray-800/50 px-5 py-3 text-white outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder-gray-500"
                type="email"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-2">
            <label className="ml-1 text-sm font-medium text-gray-300">Password</label>
            <div className="relative">
              <input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-600 bg-gray-800/50 px-5 py-3 text-white outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder-gray-500"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
               {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mt-1">
            <label className="flex cursor-pointer items-center gap-2 group">
              <input type="checkbox" className="peer h-4 w-4 rounded border-gray-600 bg-gray-800 text-emerald-500 focus:ring-emerald-500" />
              <span className="text-sm text-gray-400 group-hover:text-gray-300">Remember me</span>
            </label>
            <a href="#" className="text-sm text-emerald-400 hover:text-emerald-300 hover:underline">Forgot Password?</a>
          </div>

          <button className="mt-4 w-full rounded-full bg-emerald-600 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:bg-emerald-700 active:scale-95">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;