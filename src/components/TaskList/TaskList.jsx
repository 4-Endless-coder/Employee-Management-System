import React from "react";
import AcceptTask from "./AcceptTask";
import NewTask from "./NewTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";

const TaskList = ({ data }) => {
  return (
    <div
      id="tasklist"
      className="mt-10 flex h-[55%] w-full snap-x snap-mandatory flex-nowrap items-center gap-6 overflow-x-auto scroll-smooth py-8"
    >
      {data.tasks.map((task, idx) => {
        // Render different components based on task status
        if (task.active) {
          return <AcceptTask key={idx} data={task} />;
        }
        if (task.newTask) {
          return <NewTask key={idx} data={task} />;
        }
        if (task.completed) {
          return <CompleteTask key={idx} data={task} />;
        }
        if (task.failed) {
          return <FailedTask key={idx} data={task} />;
        }
        
        // Default fallback
        return null;
      })}
    </div>
  );
};

export default TaskList;