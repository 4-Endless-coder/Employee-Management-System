import React from "react";

const TaskListNumber = ({ data }) => {
  // Guard clause: wait for data to load
  if (!data || !data.taskCounts) {
    return (
      <div className="mt-10 w-full px-4 sm:px-0">
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          <div className="rounded-2xl bg-gray-800 px-6 py-9 text-center text-gray-400">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  const taskData = [
    {
      number: data.taskCounts.newTask.toString(),
      label: "New Task",
      gradient: "bg-gradient-to-br from-blue-400 to-blue-600",
      shadow: "shadow-blue-500/40",
      textColor: "text-blue-50",
    },
    {
      number: data.taskCounts.active.toString(),
      label: "Active",
      gradient: "bg-gradient-to-br from-yellow-400 to-yellow-600",
      shadow: "shadow-yellow-500/40",
      textColor: "text-yellow-50",
    },
    {
      number: data.taskCounts.completed.toString(),
      label: "Completed",
      gradient: "bg-gradient-to-br from-green-400 to-green-600",
      shadow: "shadow-green-500/40",
      textColor: "text-green-50",
    },
    {
      number: data.taskCounts.failed.toString(),
      label: "Failed",
      gradient: "bg-gradient-to-br from-red-400 to-red-600",
      shadow: "shadow-red-500/40",
      textColor: "text-red-50",
    },
  ];

  return (
    <div className="mt-10 w-full px-4 sm:px-0">
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {taskData.map((item, index) => (
          <div
            key={index}
            className={`relative overflow-hidden ${item.gradient} rounded-2xl px-6 py-9 shadow-xl ${item.shadow} transform cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl`}
          >
            <div className="pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>

            <div className="relative z-10">
              <h2 className="text-5xl font-bold tracking-tight text-white">
                {item.number}
              </h2>
              <h3
                className={`mt-2 text-xl font-medium ${item.textColor} tracking-wide`}
              >
                {item.label}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskListNumber;