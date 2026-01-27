import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Clock, CheckCircle2, XCircle } from "lucide-react";

const TaskListNumber = ({ data }) => {
  // Guard clause: wait for data to load
  if (!data || !data.taskCounts) {
    return (
      <div className="w-full">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-32 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-2xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  const { taskCounts } = data;

  // Performance Index: completed vs failed
  const totalDone = taskCounts.completed + taskCounts.failed;
  const performanceIndex =
    totalDone > 0
      ? Math.round((taskCounts.completed / totalDone) * 100)
      : 100;

  const totalAll =
    taskCounts.newTask +
    taskCounts.active +
    taskCounts.completed +
    taskCounts.failed;

  const vitals = [
    {
      key: "new",
      label: "New",
      count: taskCounts.newTask,
      color: "cyan",
      icon: Clock,
    },
    {
      key: "active",
      label: "Active",
      count: taskCounts.active,
      color: "amber",
      icon: TrendingUp,
    },
    {
      key: "completed",
      label: "Completed",
      count: taskCounts.completed,
      color: "emerald",
      icon: CheckCircle2,
    },
    {
      key: "failed",
      label: "Failed",
      count: taskCounts.failed,
      color: "rose",
      icon: XCircle,
    },
  ].map((vital) => ({
    ...vital,
    progress: totalAll > 0 ? (vital.count / totalAll) * 100 : 0,
  }));

  const CircularProgress = ({ progress, color }) => {
    const size = 72;
    const strokeWidth = 6;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    const colorClass =
      color === "cyan"
        ? "stroke-cyan-400"
        : color === "amber"
        ? "stroke-amber-400"
        : color === "emerald"
        ? "stroke-emerald-400"
        : "stroke-rose-400";

    return (
      <div className="relative h-18 w-18 flex items-center justify-center">
        <svg
          width={size}
          height={size}
          className="-rotate-90"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(148, 163, 184, 0.35)"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            className={colorClass}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />
        </svg>
        <span className="absolute text-xs font-semibold text-slate-100">
          {Math.round(progress)}%
        </span>
      </div>
    );
  };

  return (
    <div className="w-full space-y-4">
      {/* Performance Index card */}
      <motion.div
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex min-h-[9.5rem] flex-col overflow-hidden rounded-2xl border border-white/5 bg-linear-to-br from-white/[0.10] via-white/[0.02] to-transparent p-4 shadow-[0_18px_45px_rgba(15,23,42,0.85)] backdrop-blur-2xl"
      >
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/15 via-transparent to-transparent opacity-70" />
        <div className="relative z-10 flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300/70">
              Performance Index
            </p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl font-semibold text-slate-50">
                {performanceIndex}
              </span>
              <span className="text-sm text-slate-300">/ 100</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-400">
              {taskCounts.completed} completed · {taskCounts.failed} failed
            </p>
          </div>
          <div className="flex items-center justify-center">
            <CircularProgress progress={performanceIndex} color="emerald" />
          </div>
        </div>
      </motion.div>

      {/* Glass Vitals – responsive Bento grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {vitals.map((vital, idx) => {
          const Icon = vital.icon;
          const iconBg =
            vital.color === "cyan"
              ? "from-cyan-500/30 to-sky-500/20"
              : vital.color === "amber"
              ? "from-amber-500/30 to-yellow-500/20"
              : vital.color === "emerald"
              ? "from-emerald-500/30 to-green-500/20"
              : "from-rose-500/30 to-red-500/20";

          const textColor =
            vital.color === "cyan"
              ? "text-cyan-300"
              : vital.color === "amber"
              ? "text-amber-300"
              : vital.color === "emerald"
              ? "text-emerald-300"
              : "text-rose-300";

          return (
            <motion.div
              key={vital.key}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.08 * idx,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="relative flex min-h-[9.5rem] h-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-linear-to-br from-white/[0.10] via-white/[0.03] to-transparent p-4 shadow-[0_16px_38px_rgba(15,23,42,0.75)] backdrop-blur-xl hover:backdrop-blur-3xl"
            >
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-40" />
              <div className="relative z-10 flex items-center gap-3">
                <div className="flex flex-col items-center gap-2">
                  <CircularProgress
                    progress={vital.progress}
                    color={vital.color}
                  />
                  <span className={`text-lg font-semibold ${textColor}`}>
                    {vital.count}
                  </span>
                </div>
                <div className="flex flex-1 flex-col items-start gap-2">
                  <div
                    className={`inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r ${iconBg} px-2.5 py-1 text-[11px] font-semibold text-slate-50/90`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{vital.label}</span>
                  </div>
                  <p className="text-[10px] leading-snug text-slate-300/80">
                    {vital.label === "Failed"
                      ? "Watch out for blockers."
                      : vital.label === "Completed"
                      ? "Momentum in your favor."
                      : vital.label === "Active"
                      ? "Currently in motion."
                      : "Awaiting your focus."}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskListNumber;