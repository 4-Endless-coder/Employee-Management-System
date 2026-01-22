import React from "react";

const CreateTask = () => {
  return (
    <div className="mt-5 p-5">
      <form className="flex w-full flex-wrap items-start justify-between rounded-xl border border-white/5 bg-[#1c1c1c] p-8 shadow-2xl shadow-black/50">
        <div className="w-full space-y-6 md:w-[48%]">
          {/* Task Title */}
          <div>
            <h3 className="mb-1 text-xs font-semibold tracking-widest text-gray-400 uppercase">
              Task Title
            </h3>
            <input
              type="text"
              placeholder="Make UI design"
              className="w-full rounded-lg border border-gray-700 bg-[#2c2c2c]/50 px-4 py-3 text-sm text-white transition-all duration-300 outline-none placeholder:text-gray-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50"
            />
          </div>

          {/* Date Input*/}
          <div>
            <h3 className="mb-1 text-xs font-semibold tracking-widest text-gray-400 uppercase">
              Date
            </h3>
            <input
              type="date"
              onClick={(e) => e.target.showPicker()}
              className="w-full rounded-lg border border-gray-700 bg-[#2c2c2c]/50 px-4 py-3 text-sm text-white transition-all duration-300 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-60 [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:hover:opacity-100"
            />
          </div>

          {/* Assign To */}
          <div>
            <h3 className="mb-1 text-xs font-semibold tracking-widest text-gray-400 uppercase">
              Assign To
            </h3>
            <input
              type="text"
              placeholder="Employee Name"
              className="w-full rounded-lg border border-gray-700 bg-[#2c2c2c]/50 px-4 py-3 text-sm text-white transition-all duration-300 outline-none placeholder:text-gray-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50"
            />
          </div>

          {/* Category */}
          <div>
            <h3 className="mb-1 text-xs font-semibold tracking-widest text-gray-400 uppercase">
              Category
            </h3>
            <input
              type="text"
              placeholder="design, dev, etc"
              className="w-full rounded-lg border border-gray-700 bg-[#2c2c2c]/50 px-4 py-3 text-sm text-white transition-all duration-300 outline-none placeholder:text-gray-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50"
            />
          </div>
        </div>

        {/* Right Column - Description & Button */}
        <div className="mt-6 flex w-full flex-col items-start md:mt-0 md:w-[45%]">
          {/* Description */}
          <div className="mb-6 w-full">
            <h3 className="mb-1 text-xs font-semibold tracking-widest text-gray-400 uppercase">
              Description
            </h3>
            <textarea
              className="h-64 w-full resize-none rounded-lg border border-gray-700 bg-[#2c2c2c]/50 px-4 py-3 text-sm text-white transition-all duration-300 outline-none placeholder:text-gray-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50"
              placeholder="Detailed description of the task..."
            ></textarea>
          </div>

          {/* Create Button */}
          <button className="w-full rounded-lg bg-linear-to-r from-emerald-500 to-emerald-700 px-5 py-3 text-sm font-bold tracking-wide text-white uppercase shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:scale-[1.01] hover:from-emerald-400 hover:to-emerald-600 hover:shadow-emerald-500/40 active:scale-95">
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
