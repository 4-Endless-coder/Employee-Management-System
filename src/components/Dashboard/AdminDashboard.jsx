import React, { useContext } from "react";
import Header from "../../other/Header";
import CreateTask from "../../other/CreateTask";
import AllTask from "../../other/AllTask";
import { AuthContext } from "../../context/AuthProvider";

const AdminDashboard = ({ changeUser }) => {
  const authData = useContext(AuthContext);

  return (
    <div className="h-screen w-full bg-[#1c1c1c] p-7 overflow-auto">
      <Header changeUser={changeUser} />
      <CreateTask />
      <AllTask data={authData} />
    </div>
  );
};

export default AdminDashboard;