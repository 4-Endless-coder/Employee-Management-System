import React from "react";

const AllTask = () => {
  return (
    <div className="mt-5 h-80 rounded-xl bg-[#1c1c1c] p-5 shadow-2xl shadow-black/50">
      {/* Header Row */}
      <div className="mb-4 flex justify-between rounded-lg border border-white/5 bg-[#2c2c2c]/40 px-6 py-3 text-xs font-bold tracking-widest text-gray-400 uppercase backdrop-blur-sm">
        <h2 className="w-1/5">Employee</h2>
        <h3 className="w-1/5 text-center">New Task</h3>
        <h5 className="w-1/5 text-center">Active</h5>
        <h5 className="w-1/5 text-center">Completed</h5>
        <h5 className="w-1/5 text-center">Failed</h5>
      </div>

      {/* Scrollable List */}
      <div className="h-[80%] space-y-3 overflow-auto [&::-webkit-scrollbar]:hidden">
        {/* Row 1 - Ashesh */}
        <div className="group flex cursor-pointer justify-between rounded-lg border border-gray-800 bg-black/10 px-6 py-4 transition-all duration-300 hover:border-emerald-500/50 hover:bg-emerald-500/5">
          <h2 className="w-1/5 text-lg font-semibold text-gray-200 transition-colors group-hover:text-white">
            Ashesh
          </h2>
          <h3 className="w-1/5 text-center font-mono text-lg font-bold text-blue-400">
            1
          </h3>
          <h5 className="w-1/5 text-center font-mono text-lg font-bold text-yellow-400">
            3
          </h5>
          <h5 className="w-1/5 text-center font-mono text-lg font-bold text-green-400">
            1
          </h5>
          <h5 className="w-1/5 text-center font-mono text-lg font-bold text-red-500">
            0
          </h5>
        </div>

        {/* Row 2 - Sarthak */}
        <div className="group flex cursor-pointer justify-between rounded-lg border border-gray-800 bg-black/10 px-6 py-4 transition-all duration-300 hover:border-emerald-500/50 hover:bg-emerald-500/5">
          <h2 className="w-1/5 text-lg font-semibold text-gray-200 transition-colors group-hover:text-white">
            Sarthak
          </h2>
          <h3 className="w-1/5 text-center font-mono text-lg font-bold text-blue-400">
            2
          </h3>
          <h5 className="w-1/5 text-center font-mono text-lg font-bold text-yellow-400">
            0
          </h5>
          <h5 className="w-1/5 text-center font-mono text-lg font-bold text-green-400">
            1
          </h5>
          <h5 className="w-1/5 text-center font-mono text-lg font-bold text-red-500">
            1
          </h5>
        </div>

        {/* Row 3 - Ravi */}
        <div className="group flex cursor-pointer justify-between rounded-lg border border-gray-800 bg-black/10 px-6 py-4 transition-all duration-300 hover:border-emerald-500/50 hover:bg-emerald-500/5">
          <h2 className="w-1/5 text-lg font-semibold text-gray-200 transition-colors group-hover:text-white">
            Ravi
          </h2>
          <h3 className="w-1/5 text-center font-mono text-lg font-bold text-blue-400">
            0
          </h3>
          <h5 className="w-1/5 text-center font-mono text-lg font-bold text-yellow-400">
            1
          </h5>
          <h5 className="w-1/5 text-center font-mono text-lg font-bold text-green-400">
            2
          </h5>
          <h5 className="w-1/5 text-center font-mono text-lg font-bold text-red-500">
            0
          </h5>
        </div>

        {/* Row 4 - Priya */}
        <div className="group flex cursor-pointer justify-between rounded-lg border border-gray-800 bg-black/10 px-6 py-4 transition-all duration-300 hover:border-emerald-500/50 hover:bg-emerald-500/5">
          <h2 className="w-1/5 text-lg font-semibold text-gray-200 transition-colors group-hover:text-white">
            Priya
          </h2>
          <h3 className="w-1/5 text-center font-mono text-lg font-bold text-blue-400">
            1
          </h3>
          <h5 className="w-1/5 text-center font-mono text-lg font-bold text-yellow-400">
            1
          </h5>
          <h5 className="w-1/5 text-center font-mono text-lg font-bold text-green-400">
            0
          </h5>
          <h5 className="w-1/5 text-center font-mono text-lg font-bold text-red-500">
            2
          </h5>
        </div>

        {/* Row 5 - Amit */}
        <div className="group flex cursor-pointer justify-between rounded-lg border border-gray-800 bg-black/10 px-6 py-4 transition-all duration-300 hover:border-emerald-500/50 hover:bg-emerald-500/5">
          <h2 className="w-1/5 text-lg font-semibold text-gray-200 transition-colors group-hover:text-white">
            Amit
          </h2>
          <h3 className="w-1/5 text-center font-mono text-lg font-bold text-blue-400">
            3
          </h3>
          <h5 className="w-1/5 text-center font-mono text-lg font-bold text-yellow-400">
            2
          </h5>
          <h5 className="w-1/5 text-center font-mono text-lg font-bold text-green-400">
            1
          </h5>
          <h5 className="w-1/5 text-center font-mono text-lg font-bold text-red-500">
            0
          </h5>
        </div>
      </div>
    </div>
  );
};

export default AllTask;
