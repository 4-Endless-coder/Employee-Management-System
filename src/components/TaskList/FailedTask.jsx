import React from "react";

const FailedTask = ({ data }) => {
  return (
    <div className="group relative flex h-full w-full min-w-70 max-w-85 shrink-0 snap-center flex-col justify-between overflow-hidden rounded-3xl bg-linear-to-br from-rose-400 via-red-500 to-pink-600 p-6 shadow-2xl shadow-rose-500/30 transition-all duration-500 hover:-translate-y-3 hover:shadow-rose-500/50 cursor-pointer sm:w-[320px]">
      {/* Animated Background Gradients */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-pink-400/20 blur-3xl transition-transform duration-700 group-hover:scale-150" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-rose-400/20 blur-3xl transition-transform duration-700 group-hover:scale-150" />

      {/* Header */}
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className="group/badge inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/30 bg-white/20 px-3 py-1.5 backdrop-blur-xl transition-all duration-300 hover:bg-white/30">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-300 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-white drop-shadow-sm">Failed</span>
        </div>
        
        {/* Date - Separated with Icon */}
        <div className="flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-1.5 backdrop-blur-xl">
          <svg className="h-3.5 w-3.5 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-xs font-medium tracking-wide text-white drop-shadow-sm">
            {data.taskDate}
          </span>
        </div>
      </div>

      {/* Warning Icon - Top Right - Enhanced Visibility */}
      <div className="absolute right-5 top-5 z-10">
        <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border-2 border-white/40 bg-white/25 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-200 opacity-50"></span>
          <svg className="relative z-10 h-6 w-6 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mt-6 space-y-3">
        <h2 className="text-2xl font-bold leading-tight tracking-tight text-white drop-shadow-lg transition-all duration-300 group-hover:scale-[1.02] sm:text-3xl">
          {data.taskTitle}
        </h2>
        <p className="line-clamp-3 text-sm font-medium leading-relaxed tracking-wide text-white/90 drop-shadow-sm">
          {data.taskDescription}
        </p>
      </div>

      {/* Category Badge */}
      <div className="relative z-10 mt-5">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-linear-to-br from-white/20 to-white/10 px-4 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105">
          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
          {data.category}
        </span>
      </div>

      {/* Footer Actions */}
      <div className="relative z-10 mt-6 flex items-center justify-between gap-3 border-t border-white/20 pt-4">
        <button className="group/btn flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/20 px-4 py-2.5 text-xs font-bold text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/30 hover:scale-105 active:scale-95">
          <svg className="h-4 w-4 transition-transform duration-500 group-hover/btn:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          Retry
        </button>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-xl transition-all duration-300 hover:bg-white hover:scale-110 hover:rotate-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4 text-white transition-colors duration-300 group-hover:text-rose-600"
          >
            <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {/* Diagonal Warning Stripes Pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.3)_10px,rgba(255,255,255,0.3)_20px)]" />
      </div>

      {/* Alert Pulse Effect */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 opacity-20">
        <div className="absolute inset-0 animate-ping rounded-full bg-white" style={{animationDuration: '3s'}} />
      </div>

      {/* Sparkle Effects */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute left-[15%] top-[25%] h-1 w-1 animate-ping rounded-full bg-white/60" style={{animationDuration: '2s'}} />
        <div className="absolute right-[20%] top-[45%] h-1.5 w-1.5 animate-ping rounded-full bg-white/60" style={{animationDuration: '3s', animationDelay: '0.5s'}} />
        <div className="absolute left-[25%] bottom-[35%] h-1 w-1 animate-ping rounded-full bg-white/60" style={{animationDuration: '2.5s', animationDelay: '1s'}} />
      </div>
    </div>
  );
};

export default FailedTask;