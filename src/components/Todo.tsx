import { useState } from "react";
import AddTask from "./add-task";

export default function Todo() {
  const [data, setData] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : { tasks: [] };
  });
  const [addTask, SetAddTask] = useState(false);

  const isEmpty = data.tasks.length === 0;
  return (
    <>
      <div className="header">
        <p>To-do</p>
        <div className="controls">
          <button id="add-task" onClick={() => SetAddTask(!addTask)}>
            Add Task
          </button>
        </div>
      </div>
      <div className="tasks">
        {isEmpty ? (
          <div>
            <h3>You have no tasks!</h3>
            <button id="add-task" onClick={() => SetAddTask(!addTask)}>
              Add Task
            </button>
          </div>
        ) : (
          <p>tasks</p>
        )}
      </div>
      {addTask ? <AddTask></AddTask> : null}
    </>
  );
}
