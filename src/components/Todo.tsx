import { useState } from "react";
import AddTaskModal from "./todo/AddTaskModal";
import TaskList from "./todo/TaskList";
import TodoHeader from "./todo/TodoHeader";
import type { Task } from "./todo/types";

export default function Todo() {
  const [data, setData] = useState<{ tasks: Task[] }>(() => {
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
    const newTasks = data.tasks.filter((_, i) => i !== index);
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
      <TodoHeader onAddTask={() => SetAddTask(!addTask)} />
      <TaskList
        isEmpty={isEmpty}
        tasks={data.tasks}
        onAddTask={() => SetAddTask(!addTask)}
        onUpdateTask={UpdateTask}
        onDeleteTask={DeleteTask}
      />
      {addTask ? (
        <AddTaskModal
          taskTitle={taskTitle}
          taskContent={taskContent}
          err={err}
          onClose={() => {
            SetAddTask(!addTask);
            setErr("");
          }}
          onTaskTitleChange={setTaskTitle}
          onTaskContentChange={setTaskContent}
          onSubmit={tryAddTask}
        />
      ) : null}
    </>
  );
}
