import EmptyTasks from "./EmptyTasks";
import TaskCard from "./TaskCard";
import type { Task } from "./types";

type TaskListProps = {
  isEmpty: boolean;
  tasks: Task[];
  onAddTask: () => void;
  onUpdateTask: (index: number) => void;
  onDeleteTask: (index: number) => void;
};

export default function TaskList({
  isEmpty,
  tasks,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
}: TaskListProps) {
  return (
    <div className="tasks">
      {isEmpty ? (
        <EmptyTasks onAddTask={onAddTask} />
      ) : (
        <>
          {tasks.map((task, index) => (
            <TaskCard
              task={task}
              index={index}
              key={index}
              onUpdate={onUpdateTask}
              onDelete={onDeleteTask}
            />
          ))}
        </>
      )}
    </div>
  );
}
