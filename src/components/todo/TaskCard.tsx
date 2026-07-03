import type { Task } from "./types";

type TaskCardProps = {
  task: Task;
  index: number;
  onUpdate: (index: number) => void;
  onDelete: (index: number) => void;
};

export default function TaskCard({
  task,
  index,
  onUpdate,
  onDelete,
}: TaskCardProps) {
  return (
    <div className="task">
      <button
        className="update"
        onClick={() => {
          onUpdate(index);
        }}
      ></button>
      <button
        className="delete"
        onClick={() => {
          onDelete(index);
        }}
      ></button>
      <p className="task-title">{task.taskTitle}</p>
      <br />
      <p className="task-content">{task.taskContent}</p>
    </div>
  );
}
