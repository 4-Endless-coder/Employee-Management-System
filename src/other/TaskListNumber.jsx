import React from "react";

const TaskListNumber = () => {
  const data = [
    {
      number: "5",
      label: "New Task",
      // Gradient: Rose to Red
      gradient: "bg-gradient-to-br from-rose-400 to-red-500",
      shadow: "shadow-red-500/40",
      textColor: "text-rose-50",
    },
    {
      number: "3",
      label: "Completed",
      // Gt: Blue to Indigo
      gradient: "bg-gradient-to-br from-blue-400 to-indigo-500",
      shadow: "shadow-blue-500/40",
      textColor: "text-blue-50",
    },
    {
      number: "0",
      label: "Accepted",
      // Gt: Emerald to Teal
      gradient: "bg-gradient-to-br from-emerald-400 to-teal-500",
      shadow: "shadow-emerald-500/40",
      textColor: "text-emerald-50",
    },
    {
      number: "2",
      label: "Failed",
      // Gt: Amber to Orange
      gradient: "bg-gradient-to-br from-amber-400 to-orange-500",
      shadow: "shadow-orange-500/40",
      textColor: "text-amber-50",
    },
  ];

  return (
    <div className="mt-10 w-full px-4 sm:px-0">
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {data.map((item, index) => (
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
