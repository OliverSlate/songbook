type Task = {
  index: number;
  taskTitle: string;
  taskContent: string;
};

import { useState } from "react";

export default function Todo() {
  const [data, setData] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : { tasks: [] };
  });
  const [addTask, SetAddTask] = useState(false);

  const isEmpty = data.tasks.length === 0;

  const [taskTitle, setTaskTitle] = useState("");
  const [taskContent, setTaskContent] = useState("");
  const [err, setErr] = useState("");

  function tryAddTask() {
    //validate
    if (taskTitle === "" || taskContent === "") {
      setErr("All fields must be non-empty.");
      return;
    }
    const newData = data;
    const index = newData.tasks.length;
    newData.tasks.push({
      index: index,
      taskTitle: taskTitle,
      taskContent: taskContent,
    });
    setData(newData);
    localStorage.setItem("tasks", JSON.stringify(newData));
    Cleanup();
  }
  function UpdateTask(index: number) {
    console.log(index);
  }
  function DeleteTask(index: number) {
    const newTasks = data.tasks.filter((_: any, i: any) => i !== index);
    const newData = { ...data, tasks: newTasks };
    setData(newData);
    localStorage.setItem("tasks", JSON.stringify(newData));
    Cleanup();
  }
  function Cleanup() {
    setTaskTitle("");
    setTaskContent("");
    setErr("");
    SetAddTask(false);
  }
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
          <div className="no-task ">
            <h3>You have no tasks!</h3>
            <button id="add-task" onClick={() => SetAddTask(!addTask)}>
              Add Task
            </button>
          </div>
        ) : (
          <>
            {data.tasks.map((task: Task, index: number) => (
              <div className="task" key={index}>
                <button
                  className="update"
                  onClick={() => {
                    UpdateTask(index);
                  }}
                ></button>
                <button
                  className="delete"
                  onClick={() => {
                    DeleteTask(index);
                  }}
                ></button>
                <p className="task-title">{task.taskTitle}</p>
                <br />
                <p className="task-content">{task.taskContent}</p>
              </div>
            ))}
          </>
        )}
      </div>
      {addTask ? (
        <div className="vignette">
          <div className="view">
            <button
              className="exit"
              onClick={() => {
                SetAddTask(!addTask);
                setErr("");
              }}
            >
              X
            </button>
            <h3>Add Task</h3>
            <input
              type="text"
              placeholder="Song name / Title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            <textarea
              rows={10}
              placeholder="Content"
              value={taskContent}
              onChange={(e) => setTaskContent(e.target.value)}
            ></textarea>
            <button className="submit" onClick={tryAddTask}>
              Add Task
            </button>
            <p>{err}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
