import React from "react";

const TaskList = ({data}) => {
  const tasks = [
    {
      priority: "Critical",
      date: "20 Feb 2024",
      title: "Admin Panel Revamp",
      desc: "Complete the dashboard UI overhaul using the new design system guidelines.",
      colorClass: "bg-gradient-to-br from-rose-500 to-rose-600",
      shadowClass: "shadow-rose-400/50",
      tagColor: "bg-rose-700/50",
    },
    {
      priority: "Moderate",
      date: "21 Feb 2024",
      title: "Homepage Animation",
      desc: "Implement scroll-triggered GSAP animations for the hero section.",
      colorClass: "bg-gradient-to-br from-violet-500 to-violet-600",
      shadowClass: "shadow-violet-400/50",
      tagColor: "bg-violet-700/50",
    },
    {
      priority: "Low",
      date: "22 Feb 2024",
      title: "Database Optimization",
      desc: "Optimize SQL queries to reduce server load during peak hours.",
      colorClass: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      shadowClass: "shadow-emerald-400/50",
      tagColor: "bg-emerald-700/50",
    },
    {
      priority: "Review",
      date: "24 Feb 2024",
      title: "Client Presentation",
      desc: "Prepare the slide deck for the Q1 review meeting with stakeholders.",
      colorClass: "bg-gradient-to-br from-amber-500 to-amber-600",
      shadowClass: "shadow-amber-400/50",
      tagColor: "bg-amber-700/50",
    },
    {
      priority: "Draft",
      date: "25 Feb 2024",
      title: "Blog Content",
      desc: "Draft 3 articles about the new feature release for the marketing team.",
      colorClass: "bg-gradient-to-br from-slate-700 to-slate-800",
      shadowClass: "shadow-slate-500/40",
      tagColor: "bg-slate-600",
    },
  ];

  return (
    <div
      id="tasklist"
      className="mt-10 flex h-[55%] w-full snap-x snap-mandatory flex-nowrap items-center gap-6 overflow-x-auto scroll-smooth py-8"
    >
      {tasks.map((task, idx) => (
        <div
          key={idx}
          className={` ${task.colorClass} group relative flex h-full w-[320px] shrink-0 snap-center flex-col justify-between rounded-2xl p-6 shadow-xl ${task.shadowClass} cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:scale-105`}
        >
          <div className="pointer-events-none absolute top-0 left-0 h-full w-full bg-white/5 opacity-0 transition-opacity group-hover:opacity-100" />

          <div className="z-10 flex items-center justify-between">
            <span
              className={`rounded-md border border-white/20 px-3 py-1.5 text-xs font-bold text-white shadow-sm backdrop-blur-sm ${task.tagColor}`}
            >
              {task.priority}
            </span>
            <span className="text-xs font-medium tracking-wide text-white/80">
              {task.date}
            </span>
          </div>

          <div className="z-10 mt-8">
            <h2 className="mb-3 text-2xl leading-none font-bold tracking-tight text-white drop-shadow-md">
              {task.title}
            </h2>
            <p className="line-clamp-3 text-sm leading-relaxed font-medium tracking-wide text-white/85">
              {task.desc}
            </p>
          </div>

          <div className="z-10 mt-auto flex items-center justify-between border-t border-white/20 pt-4">
            <button className="rounded-lg bg-white/20 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/30">
              Mark Completed
            </button>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-black transition-colors group-hover:bg-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4 text-transparent transition-colors group-hover:text-black"
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
      ))}
    </div>
  );
};

export default TaskList;
