import React from "react";

const CompleteTask = ({ data }) => {
  return (
    <div className="group relative flex h-full w-full min-w-70 max-w-85 shrink-0 snap-center flex-col justify-between overflow-hidden rounded-3xl bg-linear-to-br from-emerald-400 via-teal-500 to-green-600 p-6 shadow-2xl shadow-emerald-500/30 transition-all duration-500 hover:-translate-y-3 hover:shadow-emerald-500/50 cursor-pointer sm:w-[320px]">
      {/* Animated Background Gradients */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-green-400/20 blur-3xl transition-transform duration-700 group-hover:scale-150" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-emerald-400/20 blur-3xl transition-transform duration-700 group-hover:scale-150" />

      {/* Header */}
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className="group/badge inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/30 bg-white/20 px-3 py-1.5 backdrop-blur-xl transition-all duration-300 hover:bg-white/30">
          <svg className="h-3.5 w-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-xs font-bold uppercase tracking-wider text-white drop-shadow-sm">Done</span>
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

      {/* Success Icon - Top Right - Enhanced with Border */}
      <div className="absolute right-5 top-5 z-10">
        <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border-2 border-white/40 bg-white/25 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:rotate-360">
          <svg className="relative z-10 h-6 w-6 text-white drop-shadow-lg transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
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
        <div className="flex flex-1 items-center gap-2 rounded-xl bg-white/20 px-4 py-2.5 backdrop-blur-xl">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/30">
            <svg className="h-3.5 w-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-xs font-bold text-white">Completed</span>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-xl transition-all duration-300 hover:bg-white hover:scale-110 hover:rotate-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4 text-white transition-colors duration-300 group-hover:text-emerald-600"
          >
            <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {/* Success Confetti */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute left-[10%] top-[15%] h-2 w-2 animate-bounce rounded-full bg-white/60" style={{animationDuration: '3s', animationDelay: '0s'}} />
        <div className="absolute right-[15%] top-[30%] h-1.5 w-1.5 animate-bounce rounded-full bg-white/50" style={{animationDuration: '2.5s', animationDelay: '0.3s'}} />
        <div className="absolute left-[20%] top-[50%] h-2 w-2 animate-bounce rounded-full bg-white/60" style={{animationDuration: '2.8s', animationDelay: '0.6s'}} />
        <div className="absolute right-[25%] bottom-[40%] h-1.5 w-1.5 animate-bounce rounded-full bg-white/50" style={{animationDuration: '3.2s', animationDelay: '0.9s'}} />
        <div className="absolute left-[30%] bottom-[25%] h-2 w-2 animate-bounce rounded-full bg-white/60" style={{animationDuration: '2.6s', animationDelay: '1.2s'}} />
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

export default CompleteTask;