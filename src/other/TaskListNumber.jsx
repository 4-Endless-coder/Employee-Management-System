import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Clock, CheckCircle2, XCircle, Award } from "lucide-react";

const TaskListNumber = ({ data }) => {
  // Guard clause
  if (!data || !data.taskCounts) {
    return (
      <div className="mt-8 w-full">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-40 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-2xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  const { taskCounts } = data;

  // Performance Index calculation
  const performanceIndex = useMemo(() => {
    const { completed, failed, active, newTask } = taskCounts;
    const total = completed + failed + active + newTask;
    if (total === 0) return 100;
    
    // Weighted scoring
    const score = (completed * 100 + active * 50 + newTask * 25 - failed * 50) / total;
    return Math.max(0, Math.min(100, Math.round(score)));
  }, [taskCounts]);

  const totalAll =
    taskCounts.newTask +
    taskCounts.active +
    taskCounts.completed +
    taskCounts.failed;

  const vitals = [
    {
      key: "new",
      label: "New Tasks",
      count: taskCounts.newTask,
      color: "cyan",
      icon: Clock,
      gradient: "from-cyan-500/20 via-cyan-500/10 to-transparent",
      borderColor: "border-cyan-500/40",
      iconBg: "from-cyan-500/30 to-sky-500/20",
      textColor: "text-cyan-300",
      glowColor: "rgba(34, 211, 238, 0.15)",
      description: "Awaiting your attention",
    },
    {
      key: "active",
      label: "In Progress",
      count: taskCounts.active,
      color: "amber",
      icon: TrendingUp,
      gradient: "from-amber-500/20 via-amber-500/10 to-transparent",
      borderColor: "border-amber-500/40",
      iconBg: "from-amber-500/30 to-yellow-500/20",
      textColor: "text-amber-300",
      glowColor: "rgba(245, 158, 11, 0.15)",
      description: "Currently in motion",
    },
    {
      key: "completed",
      label: "Completed",
      count: taskCounts.completed,
      color: "emerald",
      icon: CheckCircle2,
      gradient: "from-emerald-500/20 via-emerald-500/10 to-transparent",
      borderColor: "border-emerald-500/40",
      iconBg: "from-emerald-500/30 to-green-500/20",
      textColor: "text-emerald-300",
      glowColor: "rgba(16, 185, 129, 0.15)",
      description: "Mission accomplished",
    },
    {
      key: "failed",
      label: "Failed",
      count: taskCounts.failed,
      color: "rose",
      icon: XCircle,
      gradient: "from-rose-500/20 via-rose-500/10 to-transparent",
      borderColor: "border-rose-500/40",
      iconBg: "from-rose-500/30 to-red-500/20",
      textColor: "text-rose-300",
      glowColor: "rgba(244, 63, 94, 0.15)",
      description: "Needs attention",
    },
  ].map((vital) => ({
    ...vital,
    progress: totalAll > 0 ? (vital.count / totalAll) * 100 : 0,
  }));

  // Circular Progress Component
  const CircularProgress = ({ progress, color, size = 100 }) => {
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    const colorMap = {
      cyan: "#22d3ee",
      amber: "#fbbf24",
      emerald: "#10b981",
      rose: "#f43f5f",
      violet: "#a78bfa",
    };

    return (
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(148, 163, 184, 0.2)"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colorMap[color] || "#a78bfa"}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            style={{
              filter: `drop-shadow(0 0 8px ${colorMap[color]}40)`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-2xl font-bold text-white"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {Math.round(progress)}
          </motion.span>
          <span className="text-[10px] text-white/40 font-medium">%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-8 w-full max-w-6xl mx-auto space-y-6">
      {/* Performance Index full-width on all screens */}
      <motion.div
        initial={{ opacity: 0, y: -12, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -4, scale: 1.01 }}
        className="group relative flex min-h-[10rem] flex-col overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
      >
        {/* Gradient Overlay */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/10 via-transparent to-transparent opacity-60" />

        {/* Animated Glow */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-3xl"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(167, 139, 250, 0.15), transparent 70%)",
          }}
          animate={{
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Left: Labels & stats */}
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 backdrop-blur-xl">
              <Award className="h-4 w-4 text-violet-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-violet-300">
                Performance
              </span>
            </div>
            <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-white/50">
              Overall Index
            </h3>
            <p className="mt-2 text-xs text-white/40 max-w-sm">
              A weighted score combining completed, active, new, and failed missions.
            </p>
            <div className="mt-4 flex gap-6 text-xs text-white/50">
              <div>
                <div className="text-lg font-semibold text-emerald-400">
                  {taskCounts.completed}
                </div>
                <div className="uppercase tracking-wider">Wins</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-amber-400">
                  {taskCounts.active}
                </div>
                <div className="uppercase tracking-wider">Active</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-rose-400">
                  {taskCounts.failed}
                </div>
                <div className="uppercase tracking-wider">Failed</div>
              </div>
            </div>
          </div>

          {/* Right: Circular Progress */}
          <div className="flex flex-1 items-center justify-end md:justify-center">
            <CircularProgress progress={performanceIndex} color="violet" size={140} />
          </div>
        </div>
      </motion.div>

      {/* Vitals Grid – 2x2 on large screens */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
        {vitals.map((vital, idx) => {
          const Icon = vital.icon;

          return (
            <motion.div
              key={vital.key}
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.45,
                delay: 0.08 + idx * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative flex min-h-[9.5rem] h-full flex-col overflow-hidden rounded-3xl border border-white/5 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-2xl transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${vital.glowColor}, transparent)`,
              }}
            >
              {/* Glass Morphism Layer */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-transparent"
                style={{ borderRadius: "inherit" }}
              />

              {/* Inner Shadow */}
              <div
                className="absolute inset-0 shadow-inner"
                style={{
                  boxShadow: `inset 0 1px 2px rgba(255, 255, 255, 0.1)`,
                  borderRadius: "inherit",
                }}
              />

              {/* Hover Glow */}
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${vital.glowColor}, transparent 70%)`,
                }}
              />

              {/* Content */}
              <div className="relative z-10 flex h-full flex-col">
                {/* Icon Badge */}
                <div className="mb-4">
                  <div
                    className={`inline-flex items-center gap-2 rounded-xl bg-gradient-to-r ${vital.iconBg} px-3 py-2 backdrop-blur-sm`}
                  >
                    <Icon className="h-4 w-4 text-white" />
                    <span className="text-xs font-semibold text-white/90">
                      {vital.label}
                    </span>
                  </div>
                </div>

                {/* Count & Progress */}
                <div className="flex flex-1 items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className={`mb-1 text-4xl font-bold ${vital.textColor}`}>
                      {vital.count}
                    </div>
                    <p className="text-xs font-medium text-white/40">
                      {vital.description}
                    </p>
                  </div>

                  {/* Small Circular Progress */}
                  <div className="flex-shrink-0">
                    <CircularProgress
                      progress={vital.progress}
                      color={vital.color}
                      size={80}
                    />
                  </div>
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