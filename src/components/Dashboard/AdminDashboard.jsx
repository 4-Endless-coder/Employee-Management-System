import React, { useState } from "react";
import Header from "../../other/Header";
import CreateTask from "../../other/CreateTask";
import AllTask from "../../other/AllTask";

const AdminDashboard = (props) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [category, setCategory] = useState("");

  const [newTask, setNewTask] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();

    const task = {
      taskTitle,
      taskDescription,
      taskDate,
      category,
      active: false,
      newTask: true,
      completed: false,
      failed: false,
    };

    setNewTask(task);

    const data = JSON.parse(localStorage.getItem("employees")) || [];

    data.forEach((elem) => {
      if (assignTo === elem.firstName) {
        elem.tasks.push(task);
        elem.taskCounts.newTask += 1;
      }
    });

    localStorage.setItem("employees", JSON.stringify(data));

    props.setEmployees(data);

    // Reset form
    setTaskTitle("");
    setTaskDescription("");
    setTaskDate("");
    setAssignTo("");
    setCategory("");
  };

  return (
    <div className="min-h-screen w-full bg-[#1c1c1c] p-4 sm:p-6 lg:p-10">
      {/* CONTAINER: Max width constraint with proper spacing */}
      <div className="mx-auto max-w-[1600px]">
        {/* HEADER: Full width with bottom margin */}
        <div className="mb-6 sm:mb-8 lg:mb-10">
          <Header adminData={props.data} changeUser={props.changeUser} />
        </div>

        {/* MAIN GRID: Responsive layout for CreateTask and AllTask */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-10">
          {/* CREATE TASK PANEL: Full width on mobile, 4 columns on desktop */}
          <div className="lg:col-span-4">
            <div className="sticky top-6">
              <CreateTask
                taskTitle={taskTitle}
                taskDescription={taskDescription}
                taskDate={taskDate}
                assignTo={assignTo}
                category={category}
                setTaskTitle={setTaskTitle}
                setTaskDescription={setTaskDescription}
                setTaskDate={setTaskDate}
                setAssignTo={setAssignTo}
                setCategory={setCategory}
                submitHandler={submitHandler}
                employees={props.employees}
              />
            </div>
          </div>

          {/* ALL TASKS PANEL: Full width on mobile, 8 columns on desktop */}
          <div className="lg:col-span-8">
            <AllTask 
              employees={props.employees} 
              setEmployees={props.setEmployees}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;