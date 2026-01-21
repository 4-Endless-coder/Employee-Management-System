import React from "react";

const Header = () => {
  const user = {
    name: "Ashesh",
    role: "Empoloyee",
    profileImage: null,
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 border-white/20 bg-white/10 shadow-lg">
          {/* Fallback to Initials if no image */}
          <span className="text-2xl font-bold text-white">
            {user.name.charAt(0)}
          </span>
        </div>

        <div className="flex flex-col">
          <h1 className="mb-1 text-xs font-medium tracking-wider text-white/70 uppercase">
            Welcome Back
          </h1>

          <div className="flex items-center gap-3">
            <h2 className="text-2xl leading-none font-bold text-white">
              {user.name}
            </h2>

            <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-white backdrop-blur-sm">
              {user.role} 👤
            </span>
          </div>
        </div>
      </div>

      <button className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:bg-red-700 active:scale-95">
        Log Out
      </button>
    </div>
  );
};

export default Header;
